import React,{ useContext,createContext,useState } from 'react';

const UserContext = createContext();


export const UserProvider = ({children}) => {
    const [name,setName] = useState('');
    const [email,setEmail] = useState('');
    const [college,setCollege] = useState('');
    const [selectedImage, setSelectedImage] = useState(null);
    const [userId,setUserId] = useState('');
   

    return(
        <UserContext.Provider value={{name,setName,email,setEmail,college,setCollege,selectedImage,setSelectedImage,userId,setUserId}}>
            {children}
        </UserContext.Provider>
    )

}

export const useUser = () => {
    const context =useContext(UserContext)
    if(!context){
        throw new Error('useUser must be used within a UserProvider')
    }
    return context;
}