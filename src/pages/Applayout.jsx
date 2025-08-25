import { Outlet, useNavigate } from "react-router-dom";
import Header from "../components/ui/Header";
import Sidebar from "../components/ui/Sidebar/Sidebar";
import { useState, useEffect } from "react";
import { supabase } from "../services/supabase";

function AppLayout() {
  const [Project, setProject] = useState([]);
  const [contact, setContact] = useState(null);
  const [isOpen, setIsOpen] = useState(false);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  // Fetch ONLY the current user's projects from Supabase
  useEffect(() => {
    async function fetchUserProjects() {
      try {
        setLoading(true);

        // Get current user
        const {
          data: { user },
        } = await supabase.auth.getUser();

        if (!user) {
          setLoading(false);
          return;
        }

        // Fetch only this user's projects
        const { data, error } = await supabase
          .from("projects")
          .select("*")
          .eq("user_id", user.id) // ← ONLY current user's projects
          .order("created_at", { ascending: false });

        if (error) {
          throw error;
        }

        if (data) {
          setProject(data);
        }
      } catch (error) {
        console.error("Error fetching user projects:", error);
      } finally {
        setLoading(false);
      }
    }

    fetchUserProjects();
  }, []);

  function handleProjectSelect(projectID) {
    navigate(`/projects/${projectID}`);
  }

  function toggleSidebar() {
    setIsOpen((prev) => !prev);
  }

  async function HandleaddProject(newProject) {
    try {
      // Get current user
      const {
        data: { user },
      } = await supabase.auth.getUser();

      if (!user) {
        throw new Error("User not authenticated");
      }

      // Add user_id to the project
      const projectWithUser = {
        ...newProject,
        user_id: user.id,
      };

      // Insert into Supabase ONLY
      const { data, error } = await supabase
        .from("projects")
        .insert([projectWithUser])
        .select();

      if (error) {
        throw error;
      }

      if (data && data.length > 0) {
        // REFETCH from Supabase instead of updating local state
        const { data: updatedData } = await supabase
          .from("projects")
          .select("*")
          .eq("user_id", user.id)
          .order("created_at", { ascending: false });

        if (updatedData) {
          setProject(updatedData);
        }

        return data[0];
      }
    } catch (error) {
      console.error("Error adding project:", error);
      throw error;
    }
  }

  function handlecontactSubmit(newContact) {
    setContact(newContact);
  }

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50 dark:bg-neutral-900">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary-500 mx-auto"></div>
          <p className="mt-4 text-neutral-600 dark:text-neutral-400">
            Loading your projects...
          </p>
        </div>
      </div>
    );
  }

  return (
    <div
      className={`grid h-screen grid-rows-[auto_1fr] ${
        isOpen ? "grid-cols-[20rem_1fr]" : "grid-cols-[0_1fr]"
      }`}
    >
      <Header
        toggleSidebar={toggleSidebar}
        projects={Project}
        handleProjectSelect={handleProjectSelect}
      />

      <Sidebar isOpen={isOpen} toggleSidebar={toggleSidebar} />
      <main className="bg-gray-0 dark:bg-neutral-900 p-16 pb-24 overflow-scroll">
        <div className="max-w-[120rem] mx-auto flex flex-col gap-[3.2rem]">
          <Outlet
            context={{
              Project,
              setProject,
              addProject: HandleaddProject,
              contact,
              setContact,
              handlecontactSubmit,
              supabase,
            }}
          />
        </div>
      </main>
    </div>
  );
}

export default AppLayout;
