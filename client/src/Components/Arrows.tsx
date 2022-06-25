import React, { useEffect, useState } from 'react';

function Arrows({ click, setClick }: any) {
  const [arrows, setArrows] = useState<any>(null);

  useEffect(() => {
    if (click === 'arrow') {
      const arrow = {
        id: Math.random() * 1000,
      };
    }
  });

  return <div>Arrows</div>;
}

export default Arrows;
