// components/MainLayout.tsx
import { FunctionComponent, PropsWithChildren, useState, useEffect } from "react";
import { Inter } from "next/font/google";
import classNames from "classnames";
import { Button } from "@/components/Button";
import { Person } from "@/utils/common/person";
import Skeleton from "@/components/Skeleton";
import { ProfileCard } from "@/components/ProfileCard";
import useCurrentTime from '@/hooks/useCurrentTime';
import useLogPersonDetails from '@/hooks/useLogPersonDetails';
import { useLogContext } from '@/context/LogContext';

const inter = Inter({ subsets: ["latin"] });

type MainLayoutProps = {};

export const MainLayout: FunctionComponent<PropsWithChildren<MainLayoutProps>> = () => {
  const [selectedPerson, setSelectedPerson] = useState<Person | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [personData, setPersonData] = useState<any>(null);
  const [currentTime, setCurrentTime] = useState<string>(''); // State for current time

  const { enableLogs } = useLogContext(); // Get enableLogs from context

  // Update the current time every second
  useEffect(() => {
    const updateCurrentTime = () => {
      const now = new Date();
      setCurrentTime(now.toLocaleString('en-GB', { dateStyle: 'short', timeStyle: 'medium' }));
    };

    updateCurrentTime(); // Initial call
    const intervalId = setInterval(updateCurrentTime, 1000); // Update every second

    return () => clearInterval(intervalId); // Cleanup interval on component unmount
  }, []);

  // Use the custom hook to log details and current time
  useLogPersonDetails(personData, currentTime);

  const handleButtonClick = async (person: Person) => {
    console.log(`Button clicked: ${person}`);

    if (selectedPerson === person) return;

    setSelectedPerson(person);
    setLoading(true);
    setError(null);
    setPersonData(null);

    try {
      const response = await fetch(`/api/person?person=${person}`);
      if (!response.ok) {
        throw new Error(await response.text());
      }
      const data = await response.json();
      setPersonData(data);
    } catch (error: any) {
      setError(error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <main
      className={classNames(
        inter.className,
        "h-screen w-screen",
        "flex flex-col justify-center items-center"
      )}
    >
      {/* Display Current Time */}
      <div className={classNames("mb-4", "text-lg font-medium")}>
        Current Time: {currentTime}
      </div>

      {/* Buttons */}
      <div className={classNames("flex gap-2")}>
        {Object.values(Person).map((person) => (
          <Button
            key={person}
            onClick={() => handleButtonClick(person)}
            disabled={loading && selectedPerson !== person}
          >
            {person}
          </Button>
        ))}
      </div>

      {/* Other content */}
      <div className={classNames("mt-4")}>
        {loading && <Skeleton />}
        {error && <p className="text-red-500">{error}</p>}
        {personData && (
          <ProfileCard name={personData.name} title={personData.details} />
        )}
      </div>
    </main>
  );
};
