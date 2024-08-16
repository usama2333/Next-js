import { FunctionComponent, PropsWithChildren, useState } from "react";
import { Inter } from "next/font/google";
import classNames from "classnames";
import { Button } from "@/components/Button";
import { Person } from "@/utils/common/person";
import Skeleton from "@/components/Skeleton"; // Adjust import path if necessary
import { ProfileCard } from "@/components/ProfileCard";

const inter = Inter({ subsets: ["latin"] });

type MainLayoutProps = {};

export const MainLayout: FunctionComponent<PropsWithChildren<MainLayoutProps>> = () => {
  const [selectedPerson, setSelectedPerson] = useState<Person | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [personData, setPersonData] = useState<any>(null);

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

      <div className={classNames("mt-4")}>
        {loading && <Skeleton />}
        {error && <p className="text-red-500">{error}</p>}
        {personData && (
          <ProfileCard name={personData.name} details={personData.details} />
        )}
      </div>
    </main>
  );
};
