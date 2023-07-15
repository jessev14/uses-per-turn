const moduleID = 'uses-per-turn';


Hooks.once('init', () => {
    CONFIG.DND5E.limitedUsePeriods = {
        turn: 'Turn',
        ...CONFIG.DND5E.limitedUsePeriods
    };
});


Hooks.on('updateCombat', (combat, diff, options, userID) => {
    if (game.user.id !== game.users.find(u => u.isGM && u.active)?.id) return;

    const { combatant } = combat;
    const { actor } = combatant;
    const updates = [];
    for (const item of actor.items) {
        // if (item.type !== 'feat') continue;
        if (item.system.uses?.per !== 'turn') continue;

        updates.push({
            _id: item.id,
            'system.uses.value': item.system.uses.max || 0
        });
    }

    if (updates.length) return actor.updateEmbeddedDocuments('Item', updates);
});
