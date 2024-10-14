import { db } from "@/db";
import InventionUpdateInput from "./invention-update-input";
import { AddInvention } from "./add-invention";
import Image from "next/image";

export default async function Home() {
  const data = await db.invention.findMany({ orderBy: { start_year: "asc" } });

  return (
    <div className="flex w-full justify-center">
      <div className="max-w-screen-sm lg:max-w-screen-xl">
        <div className="fixed left-5 top-10">
          <AddInvention />
        </div>
        <table className="border-separate border-spacing-4">
          <thead>
            <tr className="text-lg">
              <th>id</th>
              <th>start_year</th>
              <th>end_year</th>
              <th>name</th>
              <th>description</th>
              <th>image</th>
            </tr>
          </thead>
          <tbody>
            {data.map((d) => (
              <tr key={d.id}>
                <td className="w-50">{d.id}</td>
                <td className="w-50">{d.start_year}</td>
                <td className="w-50">{d.end_year}</td>
                <td>
                  <InventionUpdateInput
                    inventionId={d.id}
                    defaultValue={d.name ?? d.description ?? ""}
                  />
                </td>
                <td className="text-xs">{d.description}</td>
                <td className="w-72">
                  {d.image_url && (
                    <Image
                      src={`/img/inventions/${d.id}.webp`}
                      className="bg-white"
                      width={1280}
                      height={720}
                      alt={`Image of ${d.name}`}
                    />
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
