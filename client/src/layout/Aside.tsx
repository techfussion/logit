// Desc: Aside component for the layout
const Aside: React.FC = () => {
    const year = new Date().getFullYear();

    return (
        <aside className="bg-white pt-2 w-72 rounded-md relative">
            <h2 className="text-xl px-3 leading-loose font-kayphodo">Logs</h2>
            <nav>
                <ul className="text-sm font-kayphodo">
                    <li className="py-2 pl-4 pr-3 flex justify-between items-center hover:bg-customGray3"><a href="#">✅ Filled</a><span className="text-textGray1 bg-customGray1 rounded-md px-2 py-1">0</span></li>
                    <li className="py-2 pl-4 pr-3 flex justify-between items-center hover:bg-customGray3"><a href="#">⭐️ Stared</a><span className="text-textGray1 bg-customGray1 rounded-md px-2 py-1">0</span></li>
                    <li className="py-2 pl-4 pr-3 flex justify-between items-center hover:bg-customGray3"><a href="#">📝 to do</a><span className="text-textGray1 bg-customGray1 rounded-md px-2 py-1">0</span></li>
                </ul>
            </nav>
            <p className="absolute bottom-2 text-xs text-textGray1 mx-auto text-center">&copy; {year} logit, All rights reserved.</p>
        </aside>
    );
}

export default Aside;