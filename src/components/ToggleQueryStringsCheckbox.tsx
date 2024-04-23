
interface ToggleQueryStringsCheckboxProps {
    toggleQueryStringsCheckboxHandler: React.ChangeEventHandler<HTMLInputElement> | undefined;
}

const ToggleQueryStringsCheckbox = ({ toggleQueryStringsCheckboxHandler }: ToggleQueryStringsCheckboxProps) => {

    return (
        <div className="flex flex-col justify-start items-start mt-4">
          <label className="flex flex-row flex-nowrap justify-start items-center">
            <input
              name="toggleQueryStrings"
              id="toggleQueryStrings"
              type="checkbox"
              className="form-checkbox"
              tabIndex={3}
              onChange={toggleQueryStringsCheckboxHandler}
              title="Check this box if you would like to toggle the query strings on the links."
            />
            <span className="font-semibold text-base pl-2">
              Toggle Query Strings
            </span>
          </label>
        </div>
    )
}

export default ToggleQueryStringsCheckbox;