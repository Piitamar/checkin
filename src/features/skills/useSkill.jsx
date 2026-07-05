import useSkills from './useSkills';
import { useState, useEffect } from 'react';

export default function useSkill() {
    const { fetchSkills } = useSkills()
    const [ skills, setSkills ] =  useState([])

    useEffect(() => {
      async function fetchData() {
        const res = await fetchSkills()
        setSkills(res)
      }
  
      fetchData()
    }, [])

    return { skills, setSkills };
}
