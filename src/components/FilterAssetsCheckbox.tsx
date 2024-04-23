
interface FilterAssetsCheckboxProps {
    filterAssetsChangeHandler: React.ChangeEventHandler<HTMLInputElement> | undefined;
}

const FilterAssetsCheckbox = ({ filterAssetsChangeHandler }: FilterAssetsCheckboxProps) => {

    return (
        <div className="flex flex-col justify-start items-start mt-4">
          <label className="flex flex-row flex-nowrap justify-start items-center">
            <input
              name="filterAssets"
              id="filterAssets"
              type="checkbox"
              className="form-checkbox"
              tabIndex={3}
              onChange={filterAssetsChangeHandler}
              title="Check this box if you would like to exclude links to website images, stylesheets, or javascript files."
            />
            <span className="font-semibold text-base pl-2">
              Exclude Website Assets
            </span>
          </label>
        </div>
    )
}

export default FilterAssetsCheckbox;