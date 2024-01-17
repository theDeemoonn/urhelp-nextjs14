export default function Page({ params }: { params: { id: string } }) {
    console.log(params.id);
    return <div>My Post: {params.id}</div>
  }