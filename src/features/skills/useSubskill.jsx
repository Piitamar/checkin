import useSkills from './useSkills';
import { useState, useEffect } from 'react';

export default function useSubskill() {
    const { fetchSubskills } = useSkills()
    const [ subSkill, setSubskill ] =  useState([])

    useEffect(() => {
      async function fetchData() {
        const res = await fetchSubskills()
        setSubskill(res)
      }
  
      fetchData()
    }, [])

    return { subSkill, setSubskill };
}
