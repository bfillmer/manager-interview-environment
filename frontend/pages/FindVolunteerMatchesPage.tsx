import { useState, type ChangeEvent, type MouseEvent } from "react";
import type { Project } from "../../backend/models";

async function fetchMatchingProjects(volunteerName: string): Promise<Project[]> {
  const encoded_name = encodeURI(volunteerName);
  try {
    const response = await fetch(`/api/volunteers/${encoded_name}/matches`, {
      headers: {
        'Content-Type': 'application/json'
      }
    });
    return response.json();
  } catch (error) {
    console.error('Error creating Volunteer:', error);
    return [];
  }
}

function VolunteerSearchBox(props: {setProjects: (projects: Project[]) => void}) {
  const [volunteerName, setVolunteerName] = useState("");
  const onChangeVolunteerName = (event: ChangeEvent<HTMLInputElement>) => {
    setVolunteerName(event.target.value);
  }
  const [isSearching, setIsSearching] = useState(false);
  const onClickSearch = async (event: MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();
    setIsSearching(true);
    const projects = await fetchMatchingProjects(volunteerName)
    console.log(`Found projects: ${projects}`);
    props.setProjects(projects);
    setIsSearching(false);
  }

  return (
    <div>
      <form>
        <label htmlFor="volunteer">Volunteer</label>
        <input type="text" id="volunteer" name="volunteer" value={volunteerName} onChange={onChangeVolunteerName} className="border border-slate-400 rounded-sm px-2 py-1 mr-2" />
        <button type="submit" onClick={onClickSearch} disabled={isSearching} className="rounded-sm px-2 py-1 bg-cyan-500 text-white hover:bg-cyan-800">Search</button>
      </form>
    </div>
  );
}


export default function FindVolunteerMatchesPage() {
  const [projects, setProjects] = useState<Project[]>([]);
  // TODO: Complete this React component, making it dynamically update with search results once the "Search" button is clicked.
  //       Give the table some basic styling:
  //           - Add borders to the table and cells [DONE]
  //           - Make the header row bold and a thicker underline. [DONE]
  //           - Alternate the background color of the rows for better readability [DONE]
  // 
  // @NOTE Installed tailwind as a vite plugin to simplify styling. Could have done inline, with js for alt rows, or used
  // any given styling library that the project would have by default.
  return (
    <div>
      <h2>Find Volunteer Matches</h2>
      <VolunteerSearchBox setProjects={setProjects} />
      <table className="my-2">
        <thead>
        <tr className="border-b-2 border-slate-800">
          <th className="p-2 text-left font-bold">Project Name</th>
          <th className="p-2 text-left font-bold">Organization Name</th>
          <th className="p-2 text-left font-bold">Required Days</th>
          <th className="p-2 text-left font-bold">Due Date</th>
        </tr>
        </thead>
        <tbody>
          {projects.map((project, index) => (
            <tr key={index} className="odd:bg-white even:bg-slate-100 border-b border-slate-900">
              <td className="p-2 text-left">{project.name}</td>
              <td className="p-2 text-left">{project.organizationName}</td>
              <td className="p-2 text-left">{project.requiredDays}</td>
              <td className="p-2 text-left">{new Date(project.dueDate).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
