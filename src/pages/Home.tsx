import Aside from "../layout/Aside"

const Home: React.FC = () => {
    const time = new Date().toDateString();

    return (
        <main className="bg-customGray3 h-screen flex p-2">
            <Aside />
            <div className="pt-5 pb-2 px-24 w-full h-full flex flex-col justify-between">
                <div className="flex justify-between items-center">
                    <div>
                        <h1 className="text-xl leading-loose">Good Evening, Vene! 👋</h1>
                        <p className="text-sm text-textGray3">Today, {time}</p>
                    </div>
                    <select className="py-2 px-3 rounded-md">
                        <option value="today">Today</option>
                        <option value="week1">Week 1</option>
                        <option value="week2">Week 2</option>
                        <option value="week3">Week 3</option>
                    </select>
                </div>
               <div className="w-full">
                    <button className="bg-black text-xs text-white py-2 px-4 rounded-full mt-5 w-9/12 text-left">+ Add new entry</button>
               </div>
            </div>
        </main>
    );
}

export default Home;