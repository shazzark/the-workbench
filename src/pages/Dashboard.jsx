// eslint-disable-next-line no-unused-vars
import { motion } from "framer-motion";
import { useOutletContext } from "react-router-dom";

import { useState, useEffect } from "react";
import { supabase } from "../services/supabase";
import ExportSection from "../components/Dashboard component/ExportSection";
import HeaderSection from "../components/Dashboard component/HeaderSection";
import StatsGrid from "../components/Dashboard component/StatsGrid";
import ProjecttechStack from "../components/Dashboard component/ProjecttechStack";
import ContactChart from "../components/Dashboard component/ContactChart";
import GoalsMileStone from "../components/Dashboard component/GoalsMileStone";
import ContactDiv from "../components/Dashboard component/ContactDiv";
import RecentProject from "../components/Dashboard component/RecentProject";

// Define colors for charts
const COLORS = [
  "#0088FE",
  "#00C49F",
  "#FFBB28",
  "#FF8042",
  "#8884D8",
  "#82CA9D",
];

function Dashboard() {
  const { Project } = useOutletContext();
  const [showQuickStats, setShowQuickStats] = useState(false);
  const [contactData, setContactData] = useState([]);
  const [monthlyMessages, setMonthlyMessages] = useState([]);
  const [loading, setLoading] = useState(true);

  // Calculate projects by tech stack - handle both array and string formats
  const projectsByStack = Project.reduce((acc, project) => {
    if (project.stack) {
      // Handle both array and string formats for backward compatibility
      const stacks = Array.isArray(project.stack)
        ? project.stack
        : [project.stack];

      stacks.forEach((stack) => {
        if (stack) {
          acc[stack] = (acc[stack] || 0) + 1;
        }
      });
    }
    return acc;
  }, {});

  const stackData = Object.entries(projectsByStack)
    .map(([name, value]) => ({
      name,
      value,
    }))
    .sort((a, b) => b.value - a.value); // Sort by count descending

  // Get top used stack
  const topStack =
    stackData.length > 0
      ? stackData[0] // First item after sorting
      : null;

  // Calculate projects with demo links
  const projectsWithLinks = Project.filter((project) => project.link).length;
  const linkPercentage =
    Project.length > 0
      ? Math.round((projectsWithLinks / Project.length) * 100)
      : 0;

  // Fetch contact data from Supabase
  useEffect(() => {
    async function fetchContactData() {
      try {
        const { data, error } = await supabase
          .from("contact_submissions")
          .select("*")
          .order("created_at", { ascending: true });

        if (error) {
          throw error;
        }

        if (data) {
          setContactData(data);

          // Process data for monthly messages chart
          const monthlyData = processMonthlyData(data);
          setMonthlyMessages(monthlyData);
        }
      } catch (error) {
        console.error("Error fetching contact data:", error);
      } finally {
        setLoading(false);
      }
    }

    fetchContactData();
  }, []);

  function processMonthlyData(contacts) {
    // Create a map for all months
    const monthNames = [
      "Jan",
      "Feb",
      "Mar",
      "Apr",
      "May",
      "Jun",
      "Jul",
      "Aug",
      "Sep",
      "Oct",
      "Nov",
      "Dec",
    ];
    const monthlyCounts = {};

    // Initialize all months with 0
    monthNames.forEach((month) => {
      monthlyCounts[month] = 0;
    });

    // Count messages per month
    contacts.forEach((contact) => {
      const date = new Date(contact.created_at);
      const month = date.toLocaleString("default", { month: "short" });
      monthlyCounts[month] = (monthlyCounts[month] || 0) + 1;
    });

    // Convert to array format for the chart
    return Object.entries(monthlyCounts).map(([month, messages]) => ({
      month,
      messages,
    }));
  }

  // Recent projects (last 3)
  const recentProjects = [...Project].reverse().slice(0, 3);

  // Quick stats for modal
  const quickStats = {
    totalProjects: Project.length,
    topStack: topStack
      ? `${topStack.name} (${topStack.value} projects)`
      : "None",
    recentProject: recentProjects.length > 0 ? recentProjects[0].name : "None",
    totalMessages: contactData.length,
  };

  if (loading) {
    return (
      <div className="max-w-7xl mx-auto px-4 py-8">
        <div className="flex items-center justify-center h-64">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary-500"></div>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      {/* Header with Quick Stats */}
      <HeaderSection
        setShowQuickStats={setShowQuickStats}
        showQuickStats={showQuickStats}
        quickStats={quickStats}
      />

      {/* Stats Grid */}
      <StatsGrid
        Project={Project}
        contactData={contactData}
        stackData={stackData}
        topStack={topStack}
        linkPercentage={linkPercentage}
        projectsWithLinks={projectsWithLinks}
      />

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Projects by Tech Stack Chart */}
        <ProjecttechStack stackData={stackData} COLORS={COLORS} />

        {/* Contact Analytics Chart */}
        <ContactChart
          contactData={contactData}
          monthlyMessages={monthlyMessages}
        />

        {/* Recent Projects */}
        <RecentProject recentProjects={recentProjects} />

        {/* Recent Contact Messages */}
        <ContactDiv contactData={contactData} />

        {/* Export/Share Section */}
        <ExportSection />

        {/* Goals / Milestones */}
        <GoalsMileStone />
      </div>
    </div>
  );
}

export default Dashboard;
