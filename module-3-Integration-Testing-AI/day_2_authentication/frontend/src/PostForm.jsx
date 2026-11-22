import React, { useActionState, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  FileText,
  Type,
  Send,
  Loader2,
  CheckCircle2,
  AlertCircle,
  PenLine,
  Sparkles,
} from "lucide-react";

import api from "./api";

const PostForm = ({ onCreated }) => {
  const [content, setContent] = useState("");

  const submitAction = async (prevState, formData) => {
    const title = formData.get("title")?.trim();
    const postContent = formData.get("content")?.trim();

    if (!title || !postContent) {
      return {
        error: "Please enter both title and content.",
        msg: "",
        title: title || "",
        content: postContent || "",
      };
    }

    try {
      await api.post("/posts", {
        title,
        content: postContent,
      });

      // Refresh posts after successful creation
      if (onCreated) {
        await onCreated();
      }

      setContent("");

      return {
        error: null,
        msg: "Your post has been published successfully!",
        title: "",
        content: "",
      };
    } catch (error) {
      return {
        error:
          error.response?.data?.error ||
          error.response?.data?.message ||
          error.message ||
          "Failed to create post. Please try again.",
        msg: "",
        title,
        content: postContent,
      };
    }
  };

  const [state, formAction, isPending] = useActionState(submitAction, {
    error: null,
    msg: "",
    title: "",
    content: "",
  });

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
      className="w-full"
    >
      <div className="bg-[#111625]/90 backdrop-blur-xl border border-white/10 rounded-3xl p-6 sm:p-8 shadow-2xl">
        {/* Header */}
        <div className="flex items-center gap-4 mb-7">
          <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-indigo-500 to-purple-600 flex items-center justify-center shadow-lg shadow-indigo-500/20">
            <PenLine className="text-white" size={23} />
          </div>

          <div>
            <h2 className="text-xl sm:text-2xl font-bold text-white">
              Create a Post
            </h2>

            <p className="text-sm text-gray-400 mt-1">
              Share your thoughts with the community.
            </p>
          </div>
        </div>

        {/* Form */}
        <form action={formAction} className="space-y-5">
          {/* Title */}
          <div>
            <label
              htmlFor="title"
              className="flex items-center gap-2 text-sm font-medium text-gray-300 mb-2"
            >
              <Type size={16} className="text-indigo-400" />
              Post Title
            </label>

            <input
              type="text"
              name="title"
              id="title"
              placeholder="Give your post an interesting title..."
              defaultValue={state.title}
              maxLength={120}
              required
              disabled={isPending}
              className="w-full bg-[#0b1020] border border-white/10 rounded-xl py-3.5 px-4 text-white placeholder-gray-500 outline-none transition-all focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500/20 disabled:opacity-50"
            />
          </div>

          {/* Content */}
          <div>
            <label
              htmlFor="content"
              className="flex items-center gap-2 text-sm font-medium text-gray-300 mb-2"
            >
              <FileText size={16} className="text-indigo-400" />
              Your Content
            </label>

            <textarea
              name="content"
              id="content"
              placeholder="What's on your mind? Start writing..."
              rows={7}
              maxLength={5000}
              defaultValue={state.content}
              required
              disabled={isPending}
              onChange={(e) => setContent(e.target.value)}
              className="w-full bg-[#0b1020] border border-white/10 rounded-xl py-4 px-4 text-white placeholder-gray-500 outline-none transition-all focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500/20 resize-y min-h-[150px] disabled:opacity-50"
            />

            <div className="flex justify-end mt-2">
              <span className="text-xs text-gray-500">
                {content.length} / 5000 characters
              </span>
            </div>
          </div>

          {/* Feedback */}
          <AnimatePresence mode="wait">
            {(state.error || state.msg) && (
              <motion.div
                key={state.error || state.msg}
                initial={{ opacity: 0, y: -8 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -8 }}
                role={state.error ? "alert" : "status"}
                aria-live="polite"
                className={`flex items-start gap-3 p-4 rounded-xl border text-sm ${
                  state.error
                    ? "bg-red-500/10 border-red-500/20 text-red-400"
                    : "bg-emerald-500/10 border-emerald-500/20 text-emerald-400"
                }`}
              >
                {state.error ? (
                  <AlertCircle size={19} className="shrink-0" />
                ) : (
                  <CheckCircle2 size={19} className="shrink-0" />
                )}

                <span>{state.error || state.msg}</span>
              </motion.div>
            )}
          </AnimatePresence>

          {/* Submit */}
          <button
            type="submit"
            disabled={isPending}
            className="w-full flex items-center justify-center gap-2 bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-500 hover:to-purple-500 text-white font-semibold py-3.5 rounded-xl shadow-lg shadow-indigo-600/20 transition-all duration-300 hover:shadow-indigo-500/30 disabled:opacity-60 disabled:cursor-not-allowed"
          >
            {isPending ? (
              <>
                <Loader2 size={19} className="animate-spin" />
                Publishing...
              </>
            ) : (
              <>
                <Send size={18} />
                Publish Post
              </>
            )}
          </button>
        </form>

        {/* Footer */}
        <div className="mt-6 pt-5 border-t border-white/10 flex items-center justify-center gap-2 text-xs text-gray-500">
          <Sparkles size={14} className="text-indigo-400" />
          Your ideas deserve to be shared.
        </div>
      </div>
    </motion.div>
  );
};

export default PostForm;
