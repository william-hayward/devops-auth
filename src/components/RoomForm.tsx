import {CloudUploadIcon} from "@heroicons/react/outline";
import {SubmitHandler, useForm} from "react-hook-form";
import {buildings, roomTypes} from "../mocks/data";

export interface RoomFormProps {
  onSubmit: SubmitHandler<RoomValues>;
}

export interface RoomValues {
  number: string;
  building: string;
  capacity: number;
  notes?: string;
  type: string | {name: string; code: string};
}

export default function RoomForm(props: RoomFormProps) {
  const {onSubmit} = props;

  const {
    register,
    handleSubmit,
    formState: {errors},
  } = useForm<RoomValues>();
  return (
    <form
      onSubmit={handleSubmit((data) =>
        onSubmit({
          ...data,
          ...{
            type: {
              name: roomTypes.find((t) => t.code === data.type).name,
              code: data.type as string,
            },
          },
        })
      )}
    >
      <div className="flex flex-col align-middle  space-y-2">
        <a className="gray-outline-button">
          <CloudUploadIcon className="h-5 w-5" /> Add Room Photos
        </a>
        <label className="font-semibold"> Building</label>
        <>
          {buildings.map((b, i) => (
            <div key={i} className="flex space-x-2">
              <input
                {...register("building", {required: true})}
                type="radio"
                value={b.code}
                data-test="building-input"
                name="building"
              ></input>
              <label className="text-sm">
                {b.name} ({b.code})
              </label>
            </div>
          ))}
        </>

        <label className="font-semibold"> Room Type</label>
        <>
          {roomTypes.map((b, i) => (
            <div key={i} className="flex space-x-2">
              <input
                {...register("type", {required: true})}
                type="radio"
                value={b.code}
                data-test="room-input"
                name="type"
              ></input>
              <label className="text-sm">{b.name}</label>
            </div>
          ))}
        </>

        <h3 className="font-bold text-red-600">
          {errors.building && <span data-test="building-error"></span>}
        </h3>

        <label className="font-semibold"> Room Number</label>
        <input
          className="border-2 rounded-md p-2"
          data-test="number-input"
          type="text"
          placeholder="Room Number"
          {...register("number", {required: true})}
        />
        <h3 className="font-bold text-red-600">
          {errors.number && (
            <span data-test="number-error"> Room number is required</span>
          )}
        </h3>
        <label className="font-semibold"> Capacity </label>
        <input
          className="border-2 rounded-md p-2"
          type="number"
          placeholder="Capacity"
          data-test="capacity-input"
          {...register("capacity", {required: true, min: 5, max: 100})}
        />
        <h3 className="font-bold text-red-600">
          {errors.capacity?.type === "required" && (
            <span data-test="capacity-error">Capacity is required</span>
          )}

          {(errors.capacity?.type === "min" ||
            errors.capacity?.type === "max") && (
            <span data-test="capacity-error">
              Capacity must be between 5 and 100{" "}
            </span>
          )}
        </h3>
      </div>

      <div className="flex justify-center w-full mt-3">
        <div>
          <button data-test="submit-button" className="blue-button_no-icon">
            Add Room
          </button>
        </div>
      </div>
    </form>
  );
}
