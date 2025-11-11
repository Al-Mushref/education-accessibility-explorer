import { useEffect, useState } from "react";
import { Button } from "./ui/button";
import { Link } from "react-router-dom";

export function Header() {
  const [dbStatus, setDbStatus] = useState<"checking" | "ok" | "error">(
    "checking"
  );
  const [dbVersion, setDbVersion] = useState<string>("");

  useEffect(() => {
    async function checkDB() {
      try {
        const res = await fetch("http://localhost:4000/api/db/health");
        const data = await res.json();
        if (data.ok) {
          setDbStatus("ok");
          setDbVersion(data.version || "");
        } else {
          setDbStatus("error");
        }
      } catch (err) {
        setDbStatus("error");
      }
    }
    checkDB();
  }, []);

  return (
    <header className="border-b bg-white px-6 py-4">
      <nav className="flex items-center justify-between">
        {/* Left side: title + nav links */}
        <div className="flex items-center space-x-8">
          <h1 className="text-xl font-semibold text-primary">
            Education Accessibility Explorer
          </h1>
          <div className="flex space-x-4">
            <Button
              variant="ghost"
              className="text-foreground hover:text-primary"
            >
              <Link to="/">Home</Link>
            </Button>
            <Button
              variant="ghost"
              className="text-foreground hover:text-primary"
            >
              <Link to="/saved">Saved Views</Link>
            </Button>
            <Button
              variant="ghost"
              className="text-foreground hover:text-primary"
            >
              <Link to="/district/1">About</Link>
            </Button>
          </div>
        </div>

        {/* Right side: DB status badge */}
        <div className="flex items-center space-x-2">
          {dbStatus === "checking" && (
            <span className="text-gray-500 text-sm">Checking DB...</span>
          )}
          {dbStatus === "ok" && (
            <span className="text-green-600 text-sm">
              🟢 DB Connected {dbVersion && `(v${dbVersion})`}
            </span>
          )}
          {dbStatus === "error" && (
            <span className="text-red-600 text-sm">🔴 DB Offline</span>
          )}
        </div>
      </nav>
    </header>
  );
}
