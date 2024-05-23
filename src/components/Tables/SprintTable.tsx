import { useUserStore } from '../../store';
import { Project, Update } from '../../types/user';

const SprintTable = (project: Project) => {
  return (
    <div role="tablist" className="tabs tabs-lifted tabs-lg">
      <input
        type="radio"
        name="my_tabs_2"
        role="tab"
        className="tab"
        aria-label="View All Sprints"
      />
      <div role="tabpanel" className="tab-content rounded-box border-base-300 bg-base-100 p-6">
        <table className="border-2f table table-pin-rows table-lg">
          <thead>
            <tr>
              <th className="text-xl">Name</th>
              <th className="text-xl">Date</th>
              <th className="text-xl">Hours</th>
              <th className="text-xl">Details</th>
            </tr>
          </thead>
          <tbody>
            {project.projUpdates.map((update) => {
              <tr>
                <th className="text-m align-top" scope="rowgroup">
                  {update.madeBy}
                </th>
                <td className="text-m align-top">{update.date}</td>
                <td className="text-m align-top">{update.hours}</td>
                <td className="text-m align-top">{update.description}</td>
              </tr>;
            })}
          </tbody>
        </table>
      </div>

      <input type="radio" name="my_tabs_2" role="tab" className="tab" aria-label="Tab 2" />
      <div role="tabpanel" className="tab-content rounded-box border-base-300 bg-base-100 p-6">
        Tab content 2
      </div>

      <input type="radio" name="my_tabs_2" role="tab" className="tab" aria-label="Tab 3" />
      <div role="tabpanel" className="tab-content rounded-box border-base-300 bg-base-100 p-6">
        Tab content 3
      </div>
    </div>

    // <ul className="font-medium, flex flex-wrap border-b border-gray-200 text-center text-sm text-gray-500">
    //   <li className="me-2">
    //     <div className="active inline-block rounded-t-lg bg-gray-100 p-4 text-blue-600">Tab 1</div>
    //   </li>
    //   <li className="me-2">
    //     <div className="inline-block rounded-t-lg p-4 hover:bg-gray-50 hover:text-gray-600 dark:hover:bg-gray-800 dark:hover:text-gray-300">
    //       Dashboard
    //     </div>
    //   </li>
    //   <li className="me-2">
    //     <div className="inline-block rounded-t-lg p-4 hover:bg-gray-50 hover:text-gray-600 dark:hover:bg-gray-800 dark:hover:text-gray-300">
    //       Settings
    //     </div>
    //   </li>
    //   <li className="me-2">
    //     <div className="inline-block rounded-t-lg p-4 hover:bg-gray-50 hover:text-gray-600 dark:hover:bg-gray-800 dark:hover:text-gray-300">
    //       Contacts
    //     </div>
    //   </li>
    // </ul>
  );
};

export default SprintTable;
