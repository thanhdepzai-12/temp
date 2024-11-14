import React, { Children, createContext, useState, useEffect  } from 'react'
export const ColorContext = createContext();
export const Contact = createContext();
    export const MainContentCv = createContext();
export const GlobalContext = ({ children }) => {

  const [color, setColor] = useState("#064420");
  const [colorText, setColorText] = useState("white");
  const [photo, setPhoto] = useState('');
    return (
    <ColorContext.Provider value={{ color, setColor,colorText,setColorText ,photo,setPhoto}}>
        {children}
    </ColorContext.Provider>
  )
}

export const UserContact = ({ children }) => {
  const [contact, setContact] = useState({});
  const [dataUpLoad, setDataUpLoad] = useState({});
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [admin,setAdmin] = useState(false);
  useEffect(() => {
    const adminId = localStorage.getItem('userId');
    
    // Kiểm tra nếu adminId khớp với ID của admin
    if (adminId && adminId === '66d9db8c6186d753626aaae7') {
      setAdmin(true);
    } else {
      setAdmin(false);
    }
  }, []); 
  return (
    <Contact.Provider value={{ contact,admin, setContact,dataUpLoad,setDataUpLoad,isAuthenticated,setIsAuthenticated}}>
      {children}
    </Contact.Provider>
  );
};


export const UserMainCv = ({ children }) => {
  const [information, setInformation] = useState({});
  const [dataProfile, setDataProfile] = useState([]);
  const [tested, setTested] = useState(true);
  const [loadings, setLoadings] = useState([]);
  const enterLoading = (index) => {
    setLoadings((prevLoadings) => {
      const newLoadings = [...prevLoadings];
      newLoadings[index] = true;
      return newLoadings;
    });
    setTimeout(() => {
      setLoadings((prevLoadings) => {
        const newLoadings = [...prevLoadings];
        newLoadings[index] = false;
        return newLoadings;
      });
    }, 2000);
  };
  return (
    <MainContentCv.Provider value={{ loadings,enterLoading,information,tested,setTested, setInformation ,setDataProfile,dataProfile}}>
      {children}
    </MainContentCv.Provider>
  );
};



