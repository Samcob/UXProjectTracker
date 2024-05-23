import { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { useUserStore } from '../store';
import { Update, Project, User } from '../types/user';

import Footer from '../components/Footer/Footer';
import AppBar from '../components/AppBar/AppBar';
import SprintTable from '../components/Tables/SprintTable';

// interface IProjectPageProps {
//   project: Project;
// }

const ProjectPage = () => {
  const [isOpen, setIsOpen] = useState(false);
  const { userList, getProject } = useUserStore();
  const location = useLocation();
  const { project } = location.state;

  // Debugging to view userList
  // useEffect(() => {
  //   console.log(project);
  // }, [project]);

  return (
    <>
      <AppBar isOpen={isOpen} setIsOpen={setIsOpen} />
      <div className="w-full flex-1">
        <div className="flex h-full overflow-y-auto p-8">
          <div className="flex-row">
            <h1 className="text-2xl font-bold text-black">{project.projName}</h1>

            <div role="tablist" className="tabs tabs-lifted tabs-lg">
              <input
                type="radio"
                name="my_tabs_2"
                role="tab"
                className="tab"
                aria-label="View All Sprints"
                defaultChecked
              />
              <div
                role="tabpanel"
                className="tab-content w-full rounded-box border-base-300 bg-base-100 p-6"
              >
                <table className="border-2f table table-pin-rows table-lg w-full">
                  <thead>
                    <tr>
                      <th className="text-xl">Name</th>
                      <th className="text-xl">Date</th>
                      <th className="text-xl">Hours</th>
                      <th className="text-xl">Details</th>
                    </tr>
                  </thead>
                  <tbody>
                    {project.projUpdates.map((update: Update) => (
                      <>
                        {console.log(update)}
                        {console.log(userList[0].projects[0].projUpdates)}
                        <tr>
                          <th className="text-m text-nowrap align-top">{update.madeBy}</th>
                          <td className="text-m text-nowrap align-top">{update.date}</td>
                          <td className="text-m text-nowrap align-top">{update.hours}</td>
                          <td className="text-m w-full align-top">{update.description}</td>
                        </tr>
                      </>
                    ))}
                    <tr className="border-t-2 border-t-slate-500">
                      <th className="text-m align-top">Total Hours</th>
                      <td />
                      <td className="text-m align-top">{project.projHours}</td>
                    </tr>
                  </tbody>
                </table>
              </div>

              <input type="radio" name="my_tabs_2" role="tab" className="tab" aria-label="Tab 2" />
              <div
                role="tabpanel"
                className="tab-content rounded-box border-base-300 bg-base-100 p-6"
              >
                Tab content 2
              </div>

              <input type="radio" name="my_tabs_2" role="tab" className="tab" aria-label="Tab 3" />
              <div
                role="tabpanel"
                className="tab-content rounded-box border-base-300 bg-base-100 p-6"
              >
                Tab content 3
              </div>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default ProjectPage;
