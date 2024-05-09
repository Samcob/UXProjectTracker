interface Projects {
  projName: string;
  ticketNum: string;
}

interface IProjectInput {
  projects: Projects[];
  onChange: () => void;
  index: number;
}

const ProjectInput = ({ projects, onChange, index }: IProjectInput) => {
  //   const { label, type, value } = objValue;
  return (
    <div className="input-group">
      <label className="form-controll w-full max-w-xs">
        <div className="label">
          <span className="label-text">Project Name</span>
        </div>
        <input
          type="text"
          id="projName"
          value={projects.projName}
          onChange={(e) => onChange(e, index)}
          placeholder="Project Name"
          className="input input-bordered w-full max-w-xs"
        />
      </label>
      <label className="form-controll w-full max-w-xs">
        <div className="label">
          <span className="label-text">Ticket #</span>
        </div>
        <input
          type="text"
          id="ticketNum"
          value={projects.ticketNum}
          onChange={(e) => onChange(e, index)}
          placeholder="Ticket #"
          className="input input-bordered w-full max-w-xs"
        />
      </label>
    </div>
  );
};

export default ProjectInput;
