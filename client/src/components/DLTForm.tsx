import { ChangeEvent, useEffect, useState } from "react";
import { designation_posts, logistics_supports, official_coverage, refreshment_supports, tech_supports } from "../libs";

type DLTFormProps = {
  techSupports?: string [];
  logisticsSupports?: string [];
  refreshmentSupports?: string [];
  officialCoverage?: string [];
  setTechSupports: (vals:string []) => void;
  setLogisticsSupports: (vals:string []) => void;
  setRefreshmentSupports: (vals:string []) => void;
  setOfficialCoverage: (vals:string []) => void;
}

export default function DLTForm(props:DLTFormProps) {
  const [techSupport, _setTechSupports] = useState({} as { [key: string]: boolean });
  const [logisticsSupports, _setLogisticsSupports] = useState({} as { [key: string]: boolean });
  const [refreshmentSupports, _setRefreshmentSupports] = useState({} as { [key: string]: boolean });
  const [officialCoverage, _setOfficialCoverage] = useState({} as { [key: string]: boolean });

  useEffect(() => {
    const arr = [] as string[];
    Object.keys(techSupport).forEach((key) => {
      if (techSupport[key]) arr.push(key);
    });
    props.setTechSupports(arr);
  
  }, [techSupport])

  useEffect(() => {
    const arr = [] as string[];
    Object.keys(logisticsSupports).forEach((key) => {
      if (logisticsSupports[key]) arr.push(key);
    });
    props.setLogisticsSupports(arr);
  
  }, [logisticsSupports])

  useEffect(() => {
    const arr = [] as string[];
    Object.keys(refreshmentSupports).forEach((key) => {
      if (refreshmentSupports[key]) arr.push(key);
    });
    props.setRefreshmentSupports(arr);
  
  }, [refreshmentSupports])

  useEffect(() => {
    const arr = [] as string[];
    Object.keys(officialCoverage).forEach((key) => {
      if (officialCoverage[key]) arr.push(key);
    });
    props.setOfficialCoverage(arr);
  
  }, [officialCoverage])

  function getDateTime(date: Date) {
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, "0"); // Months are 0-based
    const day = String(date.getDate()).padStart(2, "0");
    const formattedDateTime = `${year}-${month}-${day}`;
    return formattedDateTime;
  }

  function handleTechSupportCheckbox(e: ChangeEvent) {
    const key = (e.target as HTMLInputElement).value;
    const checked = (e.target as HTMLInputElement).checked;
    _setTechSupports(v => ({ ...v, [key]: checked }));
  }

  function handleLogisticsSupportCheckbox(e: ChangeEvent) {
    const key = (e.target as HTMLInputElement).value;
    const checked = (e.target as HTMLInputElement).checked;
    _setLogisticsSupports(v => ({ ...v, [key]: checked }));
  }

  function handleOfficialCoverageCheckbox(e: ChangeEvent) {
    const key = (e.target as HTMLInputElement).value;
    const checked = (e.target as HTMLInputElement).checked;
    _setOfficialCoverage(v => ({ ...v, [key]: checked }));
  }

  function handleRefreshmentSupportsCheckbox(e: ChangeEvent) {
    const key = (e.target as HTMLInputElement).value;
    const checked = (e.target as HTMLInputElement).checked;
    _setRefreshmentSupports(v => ({ ...v, [key]: checked }));
  }
  return (
    <div className="py-12 px-4 mx-auto max-w-2xl my-12 border rounded-md">
      <h2 className="font-bold py-2 text-xl text-center"> Distant Library Theatre Form </h2>
      <div className="flex gap-2 py-2">
        <label className="block min-w-[6rem]" htmlFor="name">
          Name:
        </label>
        <input
          type="text"
          name="name"
          id="name"
          className="w-full outline-none border-zinc-400 border-b"
          required
        />
      </div>
      <div className="flex gap-2 py-2">
        <label className="block min-w-[6rem]" htmlFor="designation">
          Designation:
        </label>
        <input
          type="text"
          name="designation"
          id="designation"
          className="w-full outline-none border-zinc-400 border-b"
          required
        />
      </div>
      <div className="flex gap-2 items-center py-2">
        <div className="pl-24">
          {
            designation_posts.map(dp =>
              <label key={`dp${dp}`} className="w-full block" htmlFor={`designation_${dp}`}>
                <input
                  type="radio"
                  value={dp}
                  name="designation_post"
                  id={`designation_${dp}`}
                  required
                />
                {dp}
              </label>
            )
          }
        </div>
      </div>

      <div className="flex gap-2 py-2">
        <label className="block min-w-[6rem]" htmlFor="mobile_no">
          Mobile No:
        </label>
        <input
          type="text"
          name="mobile_no"
          id="mobile_no"
          className="w-full outline-none border-zinc-400 border-b"
          required
        />
      </div>
      <p className="pt-2">
        Purpose of Booking (Official Meeting Purpose Only):
      </p>
      <div className="flex gap-2 py-2">
        <label className="block min-w-[6rem]" htmlFor="details">
          Details:
        </label>
        <textarea
          name="details"
          id="details"
          className="w-full outline-none border-zinc-400 border p-2"
          required
        ></textarea>
      </div>
      <div className="py-2 gap-2">
        <p>Date of Booking (during working days and Office Time): </p>
        <input
          type="date"
          name="date_of_booking"
          id="date_of_booking"
          className="border-zinc-400 border"
          min={getDateTime(new Date())}
          required
        />
      </div>
      <div className="py-2">
        <span>Time: </span>
        <input
          type="time"
          name="start_time"
          id="start_time"
          className="border-zinc-400 border"
          required
        />
        <span className="px-2">to</span>
        <input
          type="time"
          name="end_time"
          id="end_time"
          className="border-zinc-400 border"
          required
        />
        <span className="px-2">(am/pm)</span>
        <p>
          <span>Tentative Duration of the Event: </span>
          <input
            type="number"
            name="duration"
            id="duration"
            min={1}
            className="border border-zinc-400 outline-none  my-2"
          />
        </p>
      </div>

      <p className="font-semibold">
        a) Technical Support (required from ICT Centre):
      </p>
      <div className="grid">
        {tech_supports.map((ts) => (
          <label key={"ts" + ts} className="px-4" htmlFor={ts}>
            <input type="checkbox" name="tech_supports" value={ts} id={ts} onChange={handleTechSupportCheckbox} />
            {ts}
          </label>
        ))}
      </div>

      <p className="font-semibold pt-4">
        b) Logistics Support (required from Engineering Office):
      </p>
      <div className="grid">
        {logistics_supports.map((ls) => (
          <label key={"ls" + ls} className="px-4" htmlFor={ls}>
            <input type="checkbox" name="logistics_supports" value={ls} id={ls} onChange={handleLogisticsSupportCheckbox} />
            {ls}
          </label>
        ))}
        <div className="flex">
          <label className="block min-w-max px-4" htmlFor="logistics_support_reason"> If Required: </label>
          <input
            className="w-full outline-none border-zinc-400 border-b"
            type="text"
            name="logistics_support_reason"
            id="logistics_support_reason"
            required={logisticsSupports['Others']}
            />
        </div>
      </div>

      <p className="font-semibold pt-4">
        c) Official Coverage:
      </p>
      <div className="grid">
        {official_coverage.map((oc) => (
          <label key={"oc" + oc} className="px-4" htmlFor={oc}>
            <input type="checkbox" name="official_coverage" value={oc} id={oc} onChange={handleOfficialCoverageCheckbox} />
            {oc}
          </label>
        ))}
      </div>

      <p className="font-semibold pt-4">
        d) Refreshment Support at Executive Lounge at the Library,if required:
      </p>
      <div className="grid">
        {refreshment_supports.map((rs) => (
          <label key={"rs" + rs} className="px-4" htmlFor={rs}>
            <input type="checkbox" name="refreshment_supports" value={rs} id={rs} onChange={handleRefreshmentSupportsCheckbox} />
            {rs}
          </label>
        ))}
      </div>

      <div className="pt-8">
        <label htmlFor="participants">
          <input type="checkbox" name="participants" id="participants" required/>
          Number of participants (Faculty Member/Head of Office) (maximum 20):
            <input type="number" min={1} max={20} name="participants_count" id="participants_count" className="border-b border-b-zinc-400 outline-none p-1" required />
        </label>
      </div>
    </div>
  );
}
