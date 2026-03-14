import s1 from "../../assets/s1.png";

const Step5_Offer = ({ onBack, onNext }) => (
  <div className="text-center">
    <h2 className="text-2xl font-bold mb-2">Your Estimated Offer</h2>
    <p className="text-[#8E8E93] font-semibold mb-8">
      Based on current market conditions
    </p>

    <div className="mb-10">
      <p className="text-gray-500 font-bold text-sm mb-2">Estimated Value</p>
      <h1 className="text-5xl font-black font-semibold text-[#4A4A4A]">
        $7,508
      </h1>
      <p className="text-gray-400 text-sm mt-4">
        Final offer may vary after inspection
      </p>
    </div>

    <div className="border border-primary p-4 py-6 flex items-center gap-6 mb-12 bg-[#F0F7FF] max-w-[500px] mx-auto">
      <img src={s1.src} alt="Car" className="w-28  h-auto   object-contain" />
      <div className="text-left">
        <h3 className="font-semibold  ">2021 Honda Civic</h3>
        <p className="text-xs text-gray-500">76,990 km • Excellent condition</p>
      </div>
    </div>

    <div className="flex gap-4 max-w-[400px] mx-auto">
      <button
        onClick={onBack}
        className=" w-max px-20 border border-[#BFBFBF] py-4 rounded-none font-bold text-gray-500 hover:bg-gray-50 transition-colors"
      >
        Back
      </button>
      <button
        onClick={onNext}
        className="flex-1 bg-primary text-white py-4 rounded-none font-bold hover:bg-primary/90 transition-colors"
      >
        Continue
      </button>
    </div>
  </div>
);

export default Step5_Offer;
