import classNames from "classnames";

interface FormProps {
  ref: React.LegacyRef<HTMLTextAreaElement> | undefined;
  pasteEvent: React.ClipboardEventHandler<HTMLTextAreaElement> | undefined;
  rootDomainChangeHandler:
    | React.ChangeEventHandler<HTMLInputElement>
    | undefined;
  filterAssetsChangeHandler:
    | React.ChangeEventHandler<HTMLInputElement>
    | undefined;
  className?: string | undefined;
}

const Form = ({
  ref,
  pasteEvent,
  rootDomainChangeHandler,
  filterAssetsChangeHandler,
  className = "",
}: FormProps) => {
  return (
    <aside
      className={classNames(
        "flex flex-col justify-between items-start",
        className
      )}
    >
      <div className="flex flex-col justify-start items-start">
        <h1 className="font-black text-2xl mb-4">LinkMod</h1>
        <p className="text-lg text-gray-800 dark:text-gray-100 mb-6">
          Paste some text to extract a list of clickable links.
        </p>
        <div className="flex flex-col justify-start items-start mb-6">
          <label htmlFor="fqdn" className="font-semibold text-base mb-1">
            Root Domain
          </label>
          <small className="leading-4 font-light text-sm mb-2">
            If you would like to include links to internal pages, please put the
            domain name of the website the HTML content is from.
          </small>
          <input
            name="fqdn"
            id="fqdn"
            type="text"
            className="form-input w-full"
            placeholder="example.com"
            tabIndex={1}
            onChange={rootDomainChangeHandler}
          />
        </div>
        <textarea
          ref={ref}
          rows={10}
          tabIndex={2}
          className="form-input w-full"
          onPaste={pasteEvent}
          autoFocus
          placeholder="Paste some text or HTML here..."
        ></textarea>
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
      </div>

      <footer>
        <nav className="mt-8 mb-4 flex flex-row flex-nowrap justify-start items-center">
          <a href="https://github.com/crock/linkmod" title="LinkMod GitHub">
            <svg
              enableBackground="new 0 0 512 512"
              height="24px"
              id="Layer_1"
              version="1.1"
              viewBox="0 0 512 512"
              width="24px"
              xmlSpace="preserve"
              xmlns="http://www.w3.org/2000/svg"
              xmlnsXlink="http://www.w3.org/1999/xlink"
            >
              <g>
                <path
                  clipRule="evenodd"
                  d="M296.133,354.174c49.885-5.891,102.942-24.029,102.942-110.192   c0-24.49-8.624-44.448-22.67-59.869c2.266-5.89,9.515-28.114-2.734-58.947c0,0-18.139-5.898-60.759,22.669   c-18.139-4.983-38.09-8.163-56.682-8.163c-19.053,0-39.011,3.18-56.697,8.163c-43.082-28.567-61.22-22.669-61.22-22.669   c-12.241,30.833-4.983,53.057-2.718,58.947c-14.061,15.42-22.677,35.379-22.677,59.869c0,86.163,53.057,104.301,102.942,110.192   c-6.344,5.452-12.241,15.873-14.507,30.387c-12.702,5.438-45.808,15.873-65.758-18.592c0,0-11.795-21.31-34.012-22.669   c0,0-22.224-0.453-1.813,13.592c0,0,14.96,6.812,24.943,32.653c0,0,13.6,43.089,76.179,29.48v38.543   c0,5.906-4.53,12.702-15.865,10.89C96.139,438.977,32.2,354.626,32.2,255.77c0-123.807,100.216-224.022,224.03-224.022   c123.347,0,224.023,100.216,223.57,224.022c0,98.856-63.946,182.754-152.828,212.688c-11.342,2.266-15.873-4.53-15.873-10.89   V395.45C311.1,374.577,304.288,360.985,296.133,354.174L296.133,354.174z M512,256.23C512,114.73,397.263,0,256.23,0   C114.73,0,0,114.73,0,256.23C0,397.263,114.73,512,256.23,512C397.263,512,512,397.263,512,256.23L512,256.23z"
                  fill="#0D2636"
                  fillRule="evenodd"
                />
              </g>
            </svg>
          </a>
        </nav>
        <p className="text-xs text-gray-600 dark:text-gray-400 mt-6">
          &copy; 2024{" "}
          <a
            href="https://croc.io"
            target="_blank"
            rel="noopener noreferrer"
            className="text-green-500 hover:underline"
          >
            Croc Studios
          </a>
        </p>
      </footer>
    </aside>
  );
};

export default Form;
