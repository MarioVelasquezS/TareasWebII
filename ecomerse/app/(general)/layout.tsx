'use client'
import NavBar from "../Components/NavBar";
import ProviderProducto from "../Provider/ProviderProducto";


export default function LayoutProducto({
    children
}: {
    children: React.ReactNode;
}) {
    return (
        <div>


            <ProviderProducto>
                <NavBar></NavBar>
                {children}
            </ProviderProducto>


        </div>
    );
}