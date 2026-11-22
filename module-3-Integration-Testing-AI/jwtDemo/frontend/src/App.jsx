import { useEffect, useState } from "react";
import api from "./api";
import AuthForm from "./AuthForm";
import PostForm from "./PostForm";

const App = () => {
  const [user, setUser] = useState(localStorage.getItem("username"));
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);

  const loadPosts = async () => {
    try {
      const { data } = await api.get("/posts");
      setPosts(data);
    } catch (err) {
      console.error("Failed to fetch posts", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadPosts();
  }, []);

  const logout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("username");
    setUser(null);
  };

  const getInitials = (name) => (name ? name.slice(0, 2).toUpperCase() : "??");

  return (
    <div className="min-h-screen bg-[#F8FAFC] text-slate-900 selection:bg-indigo-100 selection:text-indigo-900">
      {/* Sticky Glass Header */}
      <header className="sticky top-0 z-20 bg-white/80 backdrop-blur-md border-b border-slate-200/80">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 h-16 flex justify-between items-center">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-lg bg-indigo-600 flex items-center justify-center text-white font-bold shadow-sm shadow-indigo-200">
              <svg
                className="w-4 h-4"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth="2.5"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z"
                />
              </svg>
            </div>
            <span className="text-lg font-bold tracking-tight text-slate-900">
              Chronicle<span className="text-indigo-600">.</span>
            </span>
          </div>

          {user && (
            <div className="flex items-center gap-3">
              <div className="hidden sm:flex items-center gap-2 bg-slate-100/80 border border-slate-200/60 px-3 py-1.5 rounded-full">
                <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                <span className="text-xs font-medium text-slate-700">
                  @{user}
                </span>
              </div>
              <button
                onClick={logout}
                className="inline-flex items-center gap-1.5 px-3.5 py-1.5 text-xs font-semibold text-slate-600 hover:text-red-600 bg-white hover:bg-red-50 border border-slate-200 hover:border-red-200 rounded-lg transition-all cursor-pointer shadow-2xs"
              >
                <svg
                  className="w-3.5 h-3.5"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth="2"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1"
                  />
                </svg>
                Sign out
              </button>
            </div>
          )}
        </div>
      </header>

      {/* Main Content Layout */}
      <main className="max-w-6xl mx-auto px-4 sm:px-6 py-8 sm:py-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Left Column: Sticky Auth or Post Composer */}
          <aside className="lg:col-span-5 lg:sticky lg:top-24">
            {user ? (
              <div className="space-y-4">
                <div className="flex items-center gap-3 bg-white p-4 rounded-2xl border border-slate-200/80 shadow-xs">
                  <div className="w-10 h-10 rounded-full bg-gradient-to-tr from-indigo-600 to-violet-500 text-white font-bold text-sm flex items-center justify-center shrink-0">
                    {getInitials(user)}
                  </div>
                  <div className="min-w-0">
                    <p className="text-xs text-slate-500 font-medium">
                      Welcome back
                    </p>
                    <p className="text-sm font-bold text-slate-900 truncate">
                      {user}
                    </p>
                  </div>
                </div>
                <PostForm onCreated={loadPosts} />
              </div>
            ) : (
              <AuthForm onLogin={setUser} />
            )}
          </aside>

          {/* Right Column: Posts Feed */}
          <section className="lg:col-span-7 space-y-5">
            <div className="flex items-center justify-between pb-1">
              <div>
                <h2 className="text-xl font-bold tracking-tight text-slate-900">
                  Community Feed
                </h2>
                <p className="text-xs text-slate-500 mt-0.5">
                  Latest thoughts and updates from members
                </p>
              </div>
              <span className="text-xs font-semibold bg-indigo-50 text-indigo-700 border border-indigo-100 px-3 py-1 rounded-full">
                {posts.length} {posts.length === 1 ? "Post" : "Posts"}
              </span>
            </div>

            {loading ? (
              <div className="space-y-4">
                {[1, 2, 3].map((n) => (
                  <div
                    key={n}
                    className="bg-white rounded-2xl border border-slate-200/80 p-6 space-y-3 animate-pulse"
                  >
                    <div className="h-5 bg-slate-200 rounded w-1/3" />
                    <div className="h-4 bg-slate-100 rounded w-full" />
                    <div className="h-4 bg-slate-100 rounded w-4/5" />
                  </div>
                ))}
              </div>
            ) : posts.length === 0 ? (
              <div className="bg-white rounded-2xl border border-dashed border-slate-300 p-14 text-center space-y-2">
                <div className="w-12 h-12 rounded-full bg-slate-100 text-slate-400 mx-auto flex items-center justify-center mb-3">
                  <svg
                    className="w-6 h-6"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    strokeWidth="1.5"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M19 20H5a2 2 0 01-2-2V6a2 2 0 012-2h10a2 2 0 012 2v1m2 13a2 2 0 01-2-2V7m2 13a2 2 0 002-2V9a2 2 0 00-2-2h-2m-4-3H9M7 16h6M7 8h6v4H7V8z"
                    />
                  </svg>
                </div>
                <h3 className="text-sm font-semibold text-slate-900">
                  No posts published yet
                </h3>
                <p className="text-xs text-slate-500 max-w-xs mx-auto">
                  {user
                    ? "Use the editor on the left to publish the very first post."
                    : "Sign in or create an account to start sharing your ideas."}
                </p>
              </div>
            ) : (
              <div className="space-y-4">
                {posts.map((p) => (
                  <article
                    key={p.id}
                    className="group bg-white rounded-2xl border border-slate-200/80 p-6 shadow-2xs hover:shadow-md hover:border-slate-300/80 transition-all duration-200 space-y-4"
                  >
                    {/* Author & Timestamp Header */}
                    <div className="flex items-center justify-between gap-2">
                      <div className="flex items-center gap-2.5">
                        <div className="w-8 h-8 rounded-full bg-slate-100 border border-slate-200 text-slate-700 font-semibold text-xs flex items-center justify-center">
                          {getInitials(p.author)}
                        </div>
                        <div>
                          <p className="text-xs font-semibold text-slate-900">
                            {p.author}
                          </p>
                          <time
                            dateTime={p.createdAt}
                            className="block text-[11px] text-slate-400"
                          >
                            {new Date(p.createdAt).toLocaleDateString(
                              undefined,
                              {
                                month: "short",
                                day: "numeric",
                                year: "numeric",
                                hour: "2-digit",
                                minute: "2-digit",
                              },
                            )}
                          </time>
                        </div>
                      </div>
                    </div>

                    {/* Post Body */}
                    <div className="space-y-2">
                      <h3 className="text-lg font-bold text-slate-900 group-hover:text-indigo-600 transition-colors leading-snug">
                        {p.title}
                      </h3>
                      <p className="text-slate-600 leading-relaxed text-sm whitespace-pre-line">
                        {p.content}
                      </p>
                    </div>
                  </article>
                ))}
              </div>
            )}
          </section>
        </div>
      </main>
    </div>
  );
};

export default App;
