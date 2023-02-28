export default function MainContainer({ bottomSpace }: { bottomSpace: number }) {
  return (
    <main className="h-full overflow-x-auto">
      {/*  */}
      <div
        className="mt-2"
        style={{
          height: bottomSpace + "rem",
        }}
      />
    </main>
  );
}
