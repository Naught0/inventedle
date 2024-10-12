import rawData from "@/app/data/data.json";

const data = rawData.map((d) => ({ ...d, id: crypto.randomUUID() }));

export default function Home() {
  return (
    <div className="w-full px-6 lg:px-12">
      <table>
        <thead>
          <tr className="text-lg">
            <th>year</th>
            <th>description</th>
          </tr>
        </thead>
        <tbody>
          {data.map((d) => (
            <tr key={d.id}>
              <td className="w-50">{d.year}</td>
              <td>{d.description}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
