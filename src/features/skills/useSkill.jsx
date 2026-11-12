import useSkills from './useSkills';
import { createContext, useContext, useEffect, useState } from 'react';

const SkillsContext = createContext(null);

export function SkillsProvider({ children }) {
    const { fetchSkills } = useSkills();
    const [skills, setSkills] = useState([]);

    useEffect(() => {
      async function fetchData() {
        const res = await fetchSkills();
        setSkills(res);
      }

      fetchData();
    }, []);

    return (
      <SkillsContext.Provider value={{ skills, setSkills }}>
        {children}
      </SkillsContext.Provider>
    );
}

export default function useSkill() {
    const context = useContext(SkillsContext);
    if (!context) {
      throw new Error('useSkill must be used within SkillsProvider');
    }
    return context;
}
