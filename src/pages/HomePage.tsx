import { useConfig } from "../config";
import TopMenuCustomers from "../components/TopMenuCustomers";
import { initAxiosClient } from "../core/api/axiosHttpClient";
import DisplayListFishShopCalendar from "../components/DisplayListFishShopCalendar";
import type { TemplateSchedule } from "../core/types/TemplateSchedule";
import type { FishShopFullDto } from "../core/types/FishShop";
import {  useNavigate } from "react-router-dom";

const HomePage = () => {
  const { config } = useConfig();

  initAxiosClient();

   const navigate = useNavigate();

  function handleSelectedFishShop(fishShop: FishShopFullDto, templateScedule: TemplateSchedule) {
    
     navigate("/createOrder", { state: { fishShop, templateScedule } });
  }
  return (
    <>
      <TopMenuCustomers />
      <div className="flex flex-col gap-20  bg-primaryBackgroundColor">
        <div>
          <div className="flex">
            <div className="flex-1 text-primaryTextColor p-4 text-6xl">
              <div className="flex-1 text-center">
                {config.marketing.heroTitle}
              </div>
            </div>
          </div>
        </div>
        <div>
        </div>

        <div className="flex flex-col gap-10  bg-primaryBackgroundColor text-center" >
          <div>
            {config.marketing.heroSubtitle1}
          </div>
          <div className="text-primaryTextColor text-2xl">
            {config.marketing.heroSubtitle2}
          </div>
          <div className="text-primaryTextColor text-1xl">
            {config.marketing.heroSubtitle3}
          </div>

          <div className="text-primaryTextColor text-1xl">

          </div>
          <div></div>
        </div>


        <div className="flex flex-col gap-10  bg-secondaryBackgroundColor text-center" >

          <div></div>
          <div className="text-primaryTextColor bg-secondaryBackgroundColor text-3xl" >
            {config.marketing.heroSubtitle4}
          </div>

          <DisplayListFishShopCalendar onSelect={handleSelectedFishShop} />
        </div>


      </div>
    </>
  );
};

export default HomePage;