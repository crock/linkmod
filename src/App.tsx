import React, { useState, useEffect, useRef } from 'react';
import { CopyToClipboard } from 'react-copy-to-clipboard';
import classNames from 'classnames';

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
      const urls = pasteboard.match(
        /https?:\/\/[a-zA-Z0-9\.-]+\/?[a-zA-Z0-9\/-]+\??[a-zA-Z0-9\/-_\.&;=]+/gim
      );

      if (urls?.length) {
        const uniqueArr = [...new Set(urls)];
        console.log(`Number of Unique URLs: ${uniqueArr.length}`);
        setLinks(uniqueArr);
        setMdLinks(uniqueArr.map((url) => `[${url}](${url})`).join('\n'));
        if (inputRef.current) {
          inputRef.current.value = 'Paste Here';
          inputRef.current.select();
        }
      }
    }
  };

  useEffect(extractLinks, [pasteboard]);

  useEffect(() => {
    inputRef.current?.select();
  }, []);

  return (
    <>
      <div
        className={classNames('w-screen h-screen flex flex-col items-center', {
          'justify-start': links.length,
          'justify-center': !pasteboard.length,
        })}
      >
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
                    console.info(`Copied ${links.length} urls to clipboard`)
                  }
                >
                  <button className="bg-blue-500 hover:bg-blue-400 py-1 px-2 font-semibold uppercase text-white text-xs ml-1">
                    Copy URLs
                  </button>
                </CopyToClipboard>
                <CopyToClipboard
                  text={mdLinks}
                  onCopy={() =>
                    console.info(
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
            <ul className="w-full h-auto list-none overflow-x-hidden overflow-y-scroll">
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
          className={classNames(
            'w-[100px] h-auto relative resize-none mt-6 text-black border border-1 text-center outline-none',
            {
              'w-1 h-1 absolute -left-1 -top-1 mt-0':
                links.length || pasteboard.length,
            }
          )}
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
