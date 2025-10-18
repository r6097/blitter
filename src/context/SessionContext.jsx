import { createContext, useState, useEffect } from "react";

export const SessionContext = createContext();

export const SessionProvider = ({ children }) => {
  const [sessionHistory, setSessionHistory] = useState([]);
  const [currentSession, setCurrentSession] = useState({
    date: null,
    screenshot: null,
    total: 0,
    split: [],
  });

  // Synchronize session updates to browser disk for persistent data
  useEffect(() => {
    const saved = localStorage.getItem("sessionHistory");
    if (saved) {
      setSessionHistory(JSON.parse(saved));
    }
  }, []);
  useEffect(() => {
    if (sessionHistory.length > 0) {
      localStorage.setItem("sessionHistory", JSON.stringify(sessionHistory));
    }
  }, [sessionHistory]);

  const startNewSession = () => {
    setCurrentSession({
      date: new Date().toISOString(),
      screenshot: null,
      total: 0,
      split: [],
    });
  };

  const setScreenshot = (base64String) => {
    setCurrentSession((prev) => ({
      ...prev,
      screenshot: base64String,
    }));
  };

  const setTotal = (amount) => {
    setCurrentSession((prev) => ({
      ...prev,
      total: Number(amount),
    }));
  };

  const setSplit = (splitArray) => {
    setCurrentSession((prev) => ({
      ...prev,
      split: splitArray,
    }));
  };

  const addPerson = (name, amount) => {
    setCurrentSession((prev) => ({
      ...prev,
      split: [...prev.split, { name, amount: Number(amount) }],
    }));
  };

  const updatePerson = (index, name, amount) => {
    setCurrentSession((prev) => ({
      ...prev,
      split: prev.split.map((person, i) =>
        i === index ? { name, amount: Number(amount) } : person
      ),
    }));
  };

  const removePerson = (index) => {
    setCurrentSession((prev) => ({
      ...prev,
      split: prev.split.filter((_, i) => i !== index),
    }));
  };

  const saveSession = () => {
    if (currentSession.total > 0 && currentSession.split.length > 0) {
      setSessionHistory((prev) => [currentSession, ...prev]);
      startNewSession();
      return true;
    }
    return false;
  };

  const clearHistory = () => {
    setSessionHistory([]);
    localStorage.removeItem("sessionHistory");
  };

  const deleteSession = (index) => {
    setSessionHistory((prev) => prev.filter((_, i) => i !== index));
  };

  const value = {
    currentSession,
    sessionHistory,
    startNewSession,
    setScreenshot,
    setTotal,
    setSplit,
    addPerson,
    updatePerson,
    removePerson,
    saveSession,
    clearHistory,
    deleteSession,
  };

  return (
    <SessionContext.Provider value={value}>{children}</SessionContext.Provider>
  );
};
