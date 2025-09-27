import { Palette, ShieldCheck } from "lucide-react";
import PrivacySelecctor from "./PrivacySelector";
import ThemeSelector from "./ThemeSelector";

const SettingsPage = () => {
  const themes: { option: string; desc: string; value: 'light' | 'dark' }[] = [
    { option: 'Light Theme', desc: 'Clean and bright interface', value: 'light' },
    { option: 'Dark Theme', desc: 'Easy on eyes on low light', value: 'dark' }
  ];

  const privacy_security: { option: string; desc: string; value: boolean }[] = [
    { option: 'Private Account', desc: 'Only Followers can see your posts', value: false },
    { option: 'Show Activity Status', desc: 'Let other see when you are active', value: true }
  ];



  return (
    <div className="p-4 min-h-screen" style={{ backgroundColor: 'var(--bg-color)', color: 'var(--text-color)' }}>
      <div className="p-4 border border-gray-300 rounded-2xl">
        {/* Header */}
        <div className="flex gap-2 items-center mb-6">
          <Palette className="" />
          <h2 className="text-lg font-semibold">Appearance</h2>
        </div>

        {/* Theme Options */}
        {themes.map((theme) => (
          <ThemeSelector theme={theme} />
        ))}

<div className="my-10">
 <div className="flex gap-2 items-center">
          <ShieldCheck  />
          <h2 className="text-lg font-semibold">Privacy & Security</h2>
        </div>

        {privacy_security.map((p) =>(
            <PrivacySelecctor privacySettings={p} />
        ))}
</div>
       

      </div>
    </div>
  );
};

export default SettingsPage;
