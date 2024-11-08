import Aside from "../layout/Aside"
import { icons } from "../utils/Icons";

const Home: React.FC = () => {
    const date = new Date().toDateString();
    const time = new Date().getHours();

    return (
        <main className="bg-customGray3 h-screen flex p-2">
            <Aside />
            <div className="pb-2 px-24 w-full h-full flex flex-col justify-between">
                <div className="flex justify-between items-center">
                    <div>
                        <h1 className="text-xl leading-loose font-kayphodo">Good Evening, Vene! 👋</h1>
                        <p className="text-sm text-textGray3 font-kayphodo">{time} Today, {date}</p>
                    </div>
                    <img className="cursor-pointer" src={icons.person} alt="profile" />
                </div>
               <div className="w-full">
                    <button className="bg-black text-xs py-3 px-4 rounded-full mt-5 w-9/12 text-left text-textGray2">+ Add new entry</button>
               </div>
            </div>
        </main>
    );
}

export default Home;