"use client";

import { useParams } from "next/navigation";
import { useEffect } from "react";

import { updateSubjectStudyTime } from "@/stats/services";

const sessionInitLocalStorageName = "studySessionInit";

export function StudyTimeManager() {
  if (typeof window === "undefined") return false;

  const { subjectId } = useParams();

  if (!subjectId || Array.isArray(subjectId)) return false;

  const updateStudyTime = async () => {
    if (document.visibilityState !== "hidden") return;

    const studySessionInit = sessionStorage.getItem(
      sessionInitLocalStorageName
    );

    if (!studySessionInit) return;

    const actualDate = Date.now();

    const studyTime =
      (actualDate - parseInt(studySessionInit, 10)) / (1000 * 60);

    sessionStorage.setItem(sessionInitLocalStorageName, actualDate.toString());

    await updateSubjectStudyTime(subjectId, studyTime);
  };

  useEffect(() => {
    sessionStorage.setItem(sessionInitLocalStorageName, Date.now().toString());

    window.addEventListener("visibilitychange", updateStudyTime);

    return () => {
      sessionStorage.removeItem(sessionInitLocalStorageName);

      window.removeEventListener("visibilitychange", updateStudyTime);

      updateStudyTime();
    };
  }, []);

  return false;
}
