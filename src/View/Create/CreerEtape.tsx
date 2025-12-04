import { StepTmp } from "./types";
import { FieldUpdaterTmp } from "./types";

interface CreerEtapeProps {
    data: StepTmp;
    onChange: FieldUpdaterTmp<StepTmp>;
}

export default function CreerEtape({ data, onChange }: CreerEtapeProps) {
    return (
        <div className="sub-container">
          <textarea
              value={data.description}
              placeholder="Description étape"
              onChange={(e) => onChange("description", e.target.value)}
              className="entry"
          />

            <input
                type="number"
                value={data.order}
                onChange={(e) => onChange("order", Number(e.target.value))}
                className="entry"
            />
        </div>
    );
}
