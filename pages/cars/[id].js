import Head from "next/head";
import { useRouter } from "next/router";

export async function getStaticProps({params}) {
    const req = await fetch(`http://localhost:3000/${params.id}.json`);
    const data = await req.json();

    return {
        props: { car: data },
    };
}

export async function getStaticPaths() {
    const req = await fetch('http://localhost:3000/cars.json');
    const cars = await req.json();
    const paths = cars.map(car => ({
        params: { id: car }
    }));
    return { paths, fallback: false };
}

export default function Car({car}) {
    const router = useRouter();
    const {id} = router.query;
    return (<>
    <Head>
        <title>{car.color} {car.id}</title>
    </Head>
    <h1>Hello {id}</h1>
    <img src={car.image} width="300px" />
    </>
    )
}