import Slider from "rc-slider";
import {useEffect} from "react";
import {useForm} from "react-hook-form";
import {buildings, roomTypes} from "../mocks/data";

const Section = ({children}) => (
  <div className="pt-3">
    <div className="border-b-3 pr-1 pl-1 pb-3 border-b-2 border-light-gray">
      {children}
    </div>
  </div>
);

interface FilterProp {
  capacity: number;
  onCapacityChange: (n: number | number[]) => unknown;
  onBuildingChange: (r: string[]) => unknown;
  onTypeChange: (r: string[]) => unknown;
  onReset: () => unknown;
}

export default function Filter(props: FilterProp) {
  const {capacity, onCapacityChange, onReset, onBuildingChange, onTypeChange} =
    props;
  const {register, watch, reset} = useForm();

  useEffect(() => {
    const subscription = watch((value, {name}) => {
      name === "building" && onBuildingChange(value["building"]);
      name === "type" && onTypeChange(value["type"]);
    });
    return () => subscription.unsubscribe();
  }, [watch, onBuildingChange, onTypeChange]);

  const handleReset = () => {
    reset(() => ({
      building: [],
      type: [],
    }));

    (document.getElementById("form") as HTMLFormElement).reset();
    onBuildingChange([]);
    onTypeChange([]);
    onReset();
  };

  return (
    <div>
      <form id="form">
        <div className="container min-h-screen bg-white border-r-2 border-light-gray   w-64">
          <div className="pt-6">
            <div className="flex justify-between border-b-3 pr-1 pl-1 pb-3 border-b-2 border-light-gray">
              <div>
                <h3> Filter </h3>
              </div>
              <div className="pb-2">
                <a
                  className="text-sm mt-2 text-blue cursor-pointer"
                  data-test="clear-link"
                  onClick={handleReset}
                >
                  Clear All
                </a>
              </div>
            </div>
          </div>
          <Section>
            <h3> Building</h3>
            <>
              {buildings.map((b, i) => (
                <div key={i} className="flex space-x-2">
                  <input
                    data-test="building-filter"
                    type="checkbox"
                    {...register("building")}
                    value={b.code}
                    name="building"
                  ></input>
                  <label className="text-sm">
                    {b.name} ({b.code})
                  </label>
                </div>
              ))}
            </>
          </Section>
          <Section>
            <h3> Type</h3>
            <>
              {roomTypes.map((r, i) => (
                <div key={i} className="flex space-x-2">
                  <input
                    data-test="room-filter"
                    type="checkbox"
                    {...register("type")}
                    value={r.code}
                    name="type"
                  ></input>
                  <label className="text-sm"> {r.name}</label>
                </div>
              ))}
            </>
          </Section>
          <Section>
            <h3> Minimum Capacity</h3>
            <div className="flex p-3 space-x-1">
              <div className="min-w-[95%] pt-2">
                <Slider
                  onChange={(n) => onCapacityChange(n)}
                  value={capacity}
                  min={1}
                  max={30}
                />
              </div>
              <h3 className="text-lg">{capacity}</h3>
            </div>
          </Section>
        </div>
      </form>
    </div>
  );
}
