import classNames from 'classnames';

interface FormProps {
    ref: React.LegacyRef<HTMLTextAreaElement> | undefined;
    pasteEvent: React.ClipboardEventHandler<HTMLTextAreaElement> | undefined;
    rootDomainChangeHandler: React.ChangeEventHandler<HTMLInputElement> | undefined;
    className?: string | undefined;
}

const Form = ({ ref, pasteEvent, rootDomainChangeHandler, className = "" }: FormProps) => {

    return (
        <aside className={classNames("flex flex-col justify-start items-start", className)}>
            <h1 className="font-black text-2xl mb-4">LinkMod</h1>
            <p className="text-lg text-gray-800 dark:text-gray-100 mb-6">
              Paste some text to extract a list of clickable links.
            </p>
            <div className="flex flex-col justify-start items-start mb-6">
                <label htmlFor="fqdn" className="font-semibold text-base mb-1">Root Domain</label>
                <small className="leading-4 font-light text-sm mb-2">If you would like to include links to internal pages, please put the domain name of the website the HTML content is from.</small>
                <input name="fqdn" id="fqdn" type="text" className="form-input w-full" placeholder="example.com" tabIndex={1} onChange={rootDomainChangeHandler} />
            </div>
            <textarea
                ref={ref}
                rows={10}
                tabIndex={0}
                className="form-input w-full"
                onPaste={pasteEvent}
                autoFocus
                defaultValue="Paste Here">
            </textarea>
        </aside>    
    )
}

export default Form;