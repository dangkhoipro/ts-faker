/* eslint-disable react/jsx-no-target-blank */
/* eslint-disable @next/next/no-img-element */
export const SocialButtons = () => {
  return (
    <div className="flex px-4 py-2 justify-between items-center border-b">
      <div>
        <h1 className="text-lg font-bold text-blue-600">Generate Fake Data</h1>
        <p className="text-gray-500 text-sm">Generate data from interfaces</p>
      </div>
      <div className="h-12">
        <a className="inline-block h-4" href="https://github.com/SirwanAfifi/ts-faker">
          <img src="https://img.shields.io/github/stars/SirwanAfifi/ts-faker?style=social" alt="" />
        </a>
        <a href="https://github.com/SirwanAfifi/ts-faker" target="_blank">
          <button className="h-10 ml-4">GitHub</button>
        </a>
      </div>
    </div>
  );
};
