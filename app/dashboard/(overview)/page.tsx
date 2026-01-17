export default async function Page() {
  
  return (
    <main>
      <h1 className={`mb-4 text-xl md:text-2xl`}>
        제비 대시보드
      </h1>
      <img src="/zebi-app.png" alt="제비 앱 이미지" width="280"/>
      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
      </div>
    </main>
  );
}