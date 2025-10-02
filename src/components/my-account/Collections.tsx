import { Plus } from "lucide-react";
import { useState } from "react";
import { currentUser } from "../../data/profile";
import NewCollectionModal from "../modal/NewCollectionModal";
import CollectionCard from "./CollectionCard";

const Collections = () =>{

    const [newCollectionModalOpen, setNewCollectionModalOpen] = useState(false);

    const handleSave = () =>{}

    const handleClose = () =>{
        setNewCollectionModalOpen(false);
    }

    return(
        <div>
            <div className="flex justify-between items-center">
                <h2 className="text-lg font-medium"
                style={{color:'var(--gray-text)'}}
                >My Collections</h2>
                <button 
                onClick={() => setNewCollectionModalOpen(true)}
                className="p-2 cursor-pointer bg-blue-500 text-white rounded-xl flex gap-1">
                    <Plus/>
                    New Collection
                </button>
            </div>
            <div className="grid sm:grid-cols-2 my-7 gap-3">

                {currentUser.favorites?.map((favorite)=>(
                <CollectionCard key={favorite.id} favorite={favorite} />
            ))}
            </div>
            {newCollectionModalOpen && <NewCollectionModal onClose={handleClose} onSave={handleSave} />}
            
        </div>
    )
}

export default Collections;