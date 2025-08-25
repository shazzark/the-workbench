// eslint-disable-next-line no-unused-vars
import { motion } from "framer-motion";
import { useState } from "react";
import { useOutletContext } from "react-router-dom";
import toast from "react-hot-toast";
import { supabase } from "../services/supabase";
import ContactAlredyExist from "../components/contactComponent/ContactAlredyExist";
import ContactForm from "../components/contactComponent/ContactForm";
import ContactResponse from "../components/contactComponent/ContactResponse";

function Contact() {
  const { contact, handlecontactSubmit } = useOutletContext();
  const [form, setForm] = useState({
    name: "",
    email: "",
    message: "",
    subject: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  function handleChange(event) {
    setForm({ ...form, [event.target.name]: event.target.value });
  }

  async function handleSubmit(event) {
    event.preventDefault();
    setIsSubmitting(true);

    try {
      // Insert the form data into Supabase
      const { data, error } = await supabase
        .from("contact_submissions")
        .insert([
          {
            name: form.name,
            email: form.email,
            subject: form.subject,
            message: form.message,
          },
        ])
        .select();

      if (error) {
        throw error;
      }
      console.log("Contact form submitted:", data);
      // Trigger the auto-reply function
      const { error: functionError } = await supabase.functions.invoke(
        "auto-reply-to-contact",
        {
          body: {
            name: form.name,
            email: form.email,
            subject: form.subject,
            message: form.message,
          },
        }
      );

      if (functionError) {
        console.error("Error triggering auto-reply:", functionError);
        // Don't throw error here - the form submission was still successful
      }

      // If you still want to use the context function
      handlecontactSubmit(form);

      setForm({ name: "", email: "", message: "", subject: "" });

      // Show success toast
      toast.success(
        "Message sent successfully! Check your email for confirmation.",
        {
          duration: 4000,
          position: "top-right",
          icon: "✉️",
          style: {
            background: "#0f172a",
            color: "#fff",
            border: "1px solid #1e293b",
          },
        }
      );
    } catch (error) {
      console.error("Error saving contact form:", error);
      toast.error("Failed to send message. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  }

  // If contact info already exists, show thank you message
  if (contact) {
    return <ContactAlredyExist contact={contact} />;
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="max-w-4xl mx-auto"
    >
      <div className="mb-8 text-center">
        <h1 className="text-3xl font-serif font-bold text-neutral-800 dark:text-white mb-2">
          Get in Touch
        </h1>
        <p className="text-neutral-500 dark:text-neutral-400">
          Have questions or want to discuss a project? We'd love to hear from
          you.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* contact response  */}
        <ContactResponse />

        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.2, duration: 0.5 }}
          className="bg-white dark:bg-neutral-800 rounded-xl shadow-lg p-8 border border-neutral-200 dark:border-neutral-700"
        >
          <ContactForm
            form={form}
            handleChange={handleChange}
            handleSubmit={handleSubmit}
            isSubmitting={isSubmitting}
          />
        </motion.div>
      </div>
    </motion.div>
  );
}

export default Contact;
