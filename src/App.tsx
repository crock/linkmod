import { useState, useEffect, useRef } from "react";
import { CopyToClipboard } from "react-copy-to-clipboard";
import Form from "./components/Form";

function App() {
  const [pasteboard, setPasteboard] = useState("");
  const [rootDomain, setRootDomain] = useState("")
  const [filterAssets, setFilterAssets] = useState(false)
  const [links, setLinks] = useState<RegExpMatchArray | string[]>([]);
  const [mdLinks, setMdLinks] = useState<string>("");
  const textAreaRef = useRef<HTMLTextAreaElement | null>(null);

  const handlePaste = async (event: any) => {
    event.clipboardData.items[0].getAsString((text: string) =>
      setPasteboard(text)
    );
  };

  const handleRootDomainChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.value.startsWith("http")) {
      const matches = event.target.value.match(/https?:\/\/([a-zA-Z0-9\.-]+)/);
      if (matches) {
        setRootDomain(matches[1]);
      }
    } else {
      setRootDomain(event.target.value)
    }
  }

  const handleFilterAssetsTick = (event: React.ChangeEvent<HTMLInputElement>) => {
    setFilterAssets(event.target.checked)
  }

  const extractLinks = () => {
    let allLinks = []

    if (pasteboard.length) {
      const externalUrls = pasteboard.match(
        /https?:\/\/[a-zA-Z0-9\.-]+\/?[a-zA-Z0-9\/-]+\??[a-zA-Z0-9\/-_\.&;=]+/gim
      );

      const internalUrls = pasteboard.match(
        /href=\"(\/(?!\/)[a-zA-Z0-9\.-_~!$&'\(\)\*\+,;=:@]+)\"/gim
      )

      if (internalUrls?.length) {
        // remove href=" from the beginning and " from the end
        const cleanedInternalUrls = internalUrls.map((url) => `https://${rootDomain}${url.slice(6, -1)}`);
        const uniqueArr = [...new Set(cleanedInternalUrls)];
        console.log(`Number of Unique Internal URLs: ${uniqueArr.length}`);
        allLinks.push(...uniqueArr)
      }

      if (externalUrls?.length) {
        const uniqueArr = [...new Set(externalUrls)];
        console.log(`Number of Unique External URLs: ${uniqueArr.length}`);
        allLinks.push(...uniqueArr)
      }

      if (filterAssets) {
        const patt = /\.(svg|png|webp|jpg|jpeg|heic|gif|js|css|webmanifest)$/i
        allLinks = allLinks.filter((link) => !patt.test(link))
      }

      setLinks(allLinks);
      setMdLinks(allLinks.map((url) => `[${url}](${url})`).join("\n"));

      if (textAreaRef.current) {
        textAreaRef.current.value = "Paste Here";
        textAreaRef.current.select();
      }
    }
  };

  useEffect(extractLinks, [pasteboard, rootDomain, filterAssets]);

  useEffect(() => {
    textAreaRef.current?.select();
  }, []);

  return (
    <div className="grid grid-cols-12 gap-4 h-screen">
      <Form className="col-span-12 md:col-span-4 p-10 bg-white h-auto md:h-screen" ref={textAreaRef} pasteEvent={handlePaste} rootDomainChangeHandler={handleRootDomainChange} filterAssetsChangeHandler={handleFilterAssetsTick} />
      <div className="col-span-12 md:col-span-8 flex flex-col items-center justify-start">
        <div className="w-full flex flex-row flex-nowrap justify-between items-center p-2">
          <p className="text-xs text-black dark:text-white">
            Extracted {links.length} links.
          </p>
          <div>
            <CopyToClipboard
              text={links.join("\n")}
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
      </div>
    </div>
  );
}

export default App;
