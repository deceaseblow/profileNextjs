import React from "react";
import { useAppData } from "../context/AppDataContext";

const fontStyle = {
  fontFamily: "'antsValley', sans-serif"
};
function Links() {
  const { getLinks, loading } = useAppData();

  if (loading) {
    return <div> <div className="pb-10 px-4 md:px-10">
      <h2 className="text-center text-[22px] font-bold mb-2 capitalize text-black tracking-wider border-b-4 border-black pb-2 md:text-start md:text-[40px]"
        style={fontStyle}>
        Links
      </h2>
      <p className="text-center mt-4 text-gray-500">Loading the links...</p></div></div>;
  }

  const links = getLinks();

  return (
    <div className="pb-10 px-4 md:px-10">
      <h2 className="text-center text-[22px] font-bold mb-2 capitalize text-black tracking-wider border-b-4 border-black pb-2 md:text-start md:text-[40px]"
        style={fontStyle}>
        Links
      </h2>
      <div className="px-2  pb-10 pb-10 md:px-0">
        {links.length === 0 ? (
          <p className="text-center text-gray-400">No links found.</p>
        ) : (
          <div className="overflow-x-auto shadow-md rounded-lg">
            <table className="min-w-full bg-white border border-gray-200">
              <thead>
                <tr className="bg-gray-100 border-b">
                  <th className="py-3 px-4 text-left text-gray-700 font-semibold">#</th>
                  <th className="py-3 px-4 text-left text-gray-700 font-semibold">Name</th>
                  <th className="py-3 px-4 text-left text-gray-700 font-semibold">Description</th>
                </tr>
              </thead>
              <tbody>
                {links.map((link, index) => {
                  const linkUrl = link.url;
                  return (
                    <tr
                      key={linkUrl || index}
                      className="border-b hover:bg-gray-50 transition"
                    >
                      <td className="py-3 px-4">{index + 1}</td>
                      <td className="py-3 px-4">
                        <a
                          href={linkUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className=" font-semibold hover:underline"
                        >
                          {link.name}
                        </a>
                      </td>
                      <td className="py-3 px-4">
                        {link.description || "—"}
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
}

export default Links;