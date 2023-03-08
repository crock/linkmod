import React, { useState, useEffect, useRef } from 'react';
import { CopyToClipboard } from 'react-copy-to-clipboard';

function App() {
  const [pasteboard, setPasteboard] = useState('');
  const [links, setLinks] = useState<RegExpMatchArray | string[]>([]);
  const [mdLinks, setMdLinks] = useState<string>('');
  const inputRef = useRef<HTMLTextAreaElement | null>(null);

  const focus = (event: any) => {
    event.target.focus();
    event.target.select();
  };

  const handlePaste = async (event: any) => {
    event.clipboardData.items[0].getAsString((text: string) =>
      setPasteboard(text)
    );
  };

  const extractLinks = () => {
    if (pasteboard.length) {
      const urls = pasteboard.match(/\bhttps?:\/\/\S+/gi);

      if (urls?.length) {
        console.log(`Number of URLs: ${urls.length}`);
        setLinks(urls);
        setMdLinks(urls.map((url) => `[${url}](${url})`).join('\n'));
      }
    }
  };

  useEffect(extractLinks, [pasteboard]);

  useEffect(() => {
    inputRef.current?.select();
  }, []);

  return (
    <>
      <div className="w-screen h-screen flex flex-col justify-center items-center">
        {pasteboard ? (
          <>
            <div className="w-full flex flex-row flex-nowrap justify-between items-center p-2">
              <p className="text-xs text-black dark:text-white">
                Extracted {links.length} links.
              </p>
              <div>
                <CopyToClipboard
                  text={links.join('\n')}
                  onCopy={() =>
                    alert(`Copied ${links.length} urls to clipboard`)
                  }
                >
                  <button className="bg-blue-500 hover:bg-blue-400 py-1 px-2 font-semibold uppercase text-white text-xs ml-1">
                    Copy URLs
                  </button>
                </CopyToClipboard>
                <CopyToClipboard
                  text={mdLinks}
                  onCopy={() =>
                    alert(
                      `Copied ${links.length} links in Markdown format to clipboard.`
                    )
                  }
                >
                  <button className="bg-blue-500 hover:bg-blue-400 py-1 px-2 font-semibold uppercase text-white text-xs ml-1">
                    Copy Markdown Links
                  </button>
                </CopyToClipboard>
              </div>
            </div>
            <ul className="w-full h-full list-none overflow-x-hidden overflow-y-scroll">
              {links.length
                ? links.map((link) => (
                    <li key={link}>
                      <a
                        href={link}
                        target="_blank"
                        className="block text-black dark:text-white text-xs py-2 px-3 m-2 text-center bg-gray-200 dark:bg-gray-800 hover:bg-blue-500 cursor-pointer"
                      >
                        {link}
                      </a>
                    </li>
                  ))
                : null}
            </ul>
          </>
        ) : (
          <>
            <p className="text-sm md:text-lg text-gray-800 dark:text-gray-100 user-select-none">
              Paste some text to extract a list of clickable links.
            </p>
          </>
        )}
        <textarea
          ref={inputRef}
          cols={1}
          rows={1}
          tabIndex={0}
          className="w-1 h-1 relative left-unset top-unset lg:absolute lg:-left-1 lg:-top-1 resize-none mt-3 lg:mt-0 border-none background-none outline-none text-transparent"
          onPaste={handlePaste}
          onBlur={focus}
          autoFocus
          defaultValue="Paste Here"
        ></textarea>
      </div>
    </>
  );
}

export default App;
