export default class LevelManager {
  static loadLevel(scene, levelKey) {
    const levelData = scene.cache.json.get(levelKey);

    if (!levelData) {
      console.error(`Level data not found: ${levelKey}`);
      return null;
    }

    // Set world bounds
    scene.physics.world.setBounds(0, 0, levelData.width, levelData.height);

    // Set camera bounds
    scene.cameras.main.setBounds(0, 0, levelData.width, levelData.height);

    // Set background color
    if (levelData.background) {
      scene.cameras.main.setBackgroundColor(levelData.background);
    }

    // Create platforms group
    const platforms = scene.physics.add.staticGroup();

    // Build platforms from level data
    levelData.platforms.forEach(platform => {
      this.createPlatform(scene, platforms, platform);
    });

    return {
      platforms,
      playerStart: levelData.playerStart,
      goal: levelData.goal,
      levelData
    };
  }

  static createPlatform(scene, platformsGroup, platformData) {
    const baseX = platformData.x;
    const baseY = platformData.y;

    platformData.tiles.forEach(tile => {
      const tileX = baseX + tile.x;

      if (tile.repeat) {
        // Create multiple tiles
        for (let i = 0; i < tile.repeat; i++) {
          const sprite = scene.add.sprite(tileX + (i * 70), baseY, tile.type);
          scene.physics.add.existing(sprite, true);
          sprite.body.setSize(70, 70);
          sprite.body.setOffset(0, 0);
          sprite.body.checkCollision.down = false;
          sprite.body.checkCollision.left = false;
          sprite.body.checkCollision.right = false;
          platformsGroup.add(sprite);
        }
      } else {
        // Create single tile
        const sprite = scene.add.sprite(tileX, baseY, tile.type);
        scene.physics.add.existing(sprite, true);
        sprite.body.setSize(70, 70);
        sprite.body.setOffset(0, 0);
        sprite.body.checkCollision.down = false;
        sprite.body.checkCollision.left = false;
        sprite.body.checkCollision.right = false;
        platformsGroup.add(sprite);
      }
    });
  }

  static createEnemies(scene, enemiesData) {
    const enemies = scene.physics.add.group();

    // Import enemy classes dynamically within the method
    // Note: We'll need to pass the classes from the scene
    enemiesData.forEach(enemyData => {
      let enemy;

      // Create enemy based on type
      if (enemyData.type === 'goomba' || enemyData.type === 'slime') {
        // We'll handle this in the scene instead
        enemies.add({ x: enemyData.x, y: enemyData.y, type: enemyData.type });
      } else if (enemyData.type === 'flying') {
        enemies.add({ x: enemyData.x, y: enemyData.y, type: enemyData.type });
      }
    });

    return enemies;
  }

  static createPowerups(scene, powerupsData) {
    // Will be implemented in Phase 5
    return scene.physics.add.group();
  }
}
