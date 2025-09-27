import { useState } from "react";
import ToggleButton from "../ui/ToggleButton";

type PrivacyProps = {
  privacySettings: {
    option: string;
    desc: string;
    value: boolean;
  }
}

const PrivacySelecctor = ({privacySettings}:PrivacyProps) =>{
    const [enabled, setEnabled] = useState(privacySettings.value);
    return(
        <div className="p-3 border my-3 rounded-xl flex gap-3 items-center cursor-pointer transition-all">
            
            <div className="flex  w-full justify-between items-center p-2">
                <div className="flex flex-col gap-1">
                    <h2 className="text-md font-semibold">{privacySettings.option}</h2>
                    <p className="text-sm">{privacySettings.desc}</p>
                </div>
                <ToggleButton 
                enabled={enabled} 
                onToggle={() =>{setEnabled(prev => !prev)}}
                />
            </div>
        </div>
    )
}

export default PrivacySelecctor;