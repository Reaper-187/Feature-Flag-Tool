// Settings.tsx
import { User, Bell, Shield, Palette, Globe, Database } from "lucide-react";

import { ProfileSettings } from "@/components/settings-comp/ProfileSettings";
import { NotificationSettings } from "@/components/settings-comp/NotificationSettings";
import { AppearanceSettings } from "@/components/settings-comp/AppearanceSettings";
import { SecuritySettings } from "@/components/settings-comp/SecuritySettings";
import { LanguageSettings } from "@/components/settings-comp/LanguageSettings";
import { DataSettings } from "@/components/settings-comp/DataSettings";

export const Settings = () => {
  const settingsSections = [
    { id: "profile", label: "Profile", icon: User, component: ProfileSettings },
    {
      id: "appearance",
      label: "Appearance",
      icon: Palette,
      component: AppearanceSettings,
    },
    {
      id: "notifications",
      label: "Notifications",
      icon: Bell,
      component: NotificationSettings,
    },
    {
      id: "security",
      label: "Security",
      icon: Shield,
      component: SecuritySettings,
    },
    {
      id: "language",
      label: "Language",
      icon: Globe,
      component: LanguageSettings,
    },
    { id: "data", label: "Data", icon: Database, component: DataSettings },
  ];

  return (
    <div className="container mx-auto max-w-6xl p-6 space-y-6">
      <div className="space-y-1">
        <h1 className="text-3xl font-bold tracking-tight">Settings</h1>
        <p className="text-muted-foreground">
          Manage your account preferences and application settings
        </p>
      </div>

      <div className="flex flex-col space-y-8 lg:flex-row lg:space-x-12 lg:space-y-0">
        <aside className="lg:w-1/4">
          <nav className="flex space-x-2 lg:flex-col lg:space-x-0 lg:space-y-1">
            {settingsSections.map((section) => (
              <button
                key={section.id}
                className="flex justify-start items-center gap-3 px-4 py-2.5 m-1 w-full 
               rounded-md border-2 border-transparent 
               hover:border-primary hover:bg-accent hover:text-accent-foreground
               transition-all duration-200 ease-in-out"
                onClick={() => {
                  document
                    .getElementById(section.id)
                    ?.scrollIntoView({ behavior: "smooth" });
                }}
              >
                <section.icon className="h-4 w-4 transition-transform duration-200 group-hover:scale-105" />
                <span className="text-sm font-medium">{section.label}</span>
              </button>
            ))}
          </nav>
        </aside>

        <div className="flex-1 space-y-6">
          {settingsSections.map((section) => (
            <section.component key={section.id} id={section.id} />
          ))}
        </div>
      </div>
    </div>
  );
};
