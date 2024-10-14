import { db } from "@/db";
import InventionUpdateInput from "./invention-update-input";
import { AddInvention } from "./add-invention";

export default async function Home() {
  const data = await db.invention.findMany({ orderBy: { start_year: "asc" } });

  return (
    <div className="flex w-full justify-center">
      <div className="max-w-screen-sm lg:max-w-screen-md">
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
              <th>wiki_summary</th>
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
                <td className="text-xs">{d.wiki_summary}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
