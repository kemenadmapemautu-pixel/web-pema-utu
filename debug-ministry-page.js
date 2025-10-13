// ================================
// SCRIPT DEBUG - Ministry Page
// ================================
// Copy paste script ini ke Console Browser (F12)
// untuk mengecek kenapa konten tidak muncul

console.log('🔍 Starting Debug...\n');

// 1. Cek LocalStorage Data
console.log('📦 Checking localStorage data...\n');

const pengurusList = localStorage.getItem('pengurusList');
const ministryTeams = localStorage.getItem('ministryTeams');
const ministryContents = localStorage.getItem('ministryContents');

console.log('✓ pengurusList exists?', pengurusList ? 'YES' : 'NO');
console.log('✓ ministryTeams exists?', ministryTeams ? 'YES' : 'NO');
console.log('✓ ministryContents exists?', ministryContents ? 'YES' : 'NO');

// 2. Parse dan tampilkan data
if (pengurusList) {
    try {
        const pengurus = JSON.parse(pengurusList);
        console.log('\n📊 PENGURUS LIST (Total:', pengurus.length, ')');
        pengurus.forEach((p, i) => {
            console.log(`  ${i + 1}. ${p.nama} - ${p.jabatan}`);
            console.log(`     Departemen: "${p.departemen}"`);
        });
    } catch (e) {
        console.error('❌ Error parsing pengurusList:', e);
    }
} else {
    console.log('\n❌ NO DATA in pengurusList');
    console.log('   Run this to add data:');
    console.log(`   
localStorage.setItem('pengurusList', JSON.stringify([{
    id: "menteri-001",
    nama: "Budi Santoso",
    jabatan: "Menteri Advokasi dan Hak Mahasiswa",
    departemen: "Kementerian Advokasi dan Hak Mahasiswa",
    foto: "https://ui-avatars.com/api/?name=Budi+Santoso&size=400&background=1e40af&color=fff",
    email: "budi@student.utu.ac.id",
    telepon: "+62812345678",
    deskripsi: "Menteri Advokasi",
    tipe: "menteri",
    socialMedia: {
        instagram: "@budi",
        linkedin: "",
        twitter: ""
    }
}]));
console.log('✅ Data added! Refresh page.');
    `);
}

if (ministryTeams) {
    try {
        const teams = JSON.parse(ministryTeams);
        console.log('\n📊 MINISTRY TEAMS (Total:', teams.length, ')');
        teams.forEach((t, i) => {
            console.log(`  ${i + 1}. ${t.ministryName}`);
            console.log(`     Members: ${t.members.length}`);
            t.members.forEach((m, j) => {
                console.log(`       - ${m.name} (${m.role})`);
            });
        });
    } catch (e) {
        console.error('❌ Error parsing ministryTeams:', e);
    }
} else {
    console.log('\n❌ NO DATA in ministryTeams');
    console.log('   Run this to add data:');
    console.log(`
localStorage.setItem('ministryTeams', JSON.stringify([{
    ministryName: "Kementerian Advokasi dan Hak Mahasiswa",
    ministerId: "menteri-001",
    members: [{
        id: "w1",
        name: "Ahmad Fadhil",
        role: "wakil",
        email: "ahmad@student.utu.ac.id",
        phone: "+62834567890",
        photo: "https://ui-avatars.com/api/?name=Ahmad+Fadhil&size=400&background=eab308&color=000",
        description: "Wakil Menteri",
        socialMedia: {
            instagram: "@ahmad",
            linkedin: "",
            twitter: ""
        }
    }]
}]));
console.log('✅ Data added! Refresh page.');
    `);
}

// 3. Cek current page
console.log('\n🌐 Current Page Info:');
console.log('   URL:', window.location.pathname);

// 4. Cek matching dengan ministry name
if (pengurusList && ministryTeams) {
    const pengurus = JSON.parse(pengurusList);
    const teams = JSON.parse(ministryTeams);
    
    console.log('\n🔍 Checking if data matches current page...');
    
    // List semua departemen yang ada
    const departments = pengurus.map(p => p.departemen).filter(Boolean);
    console.log('   Available departments:', departments);
    
    // List semua ministry names di teams
    const ministryNames = teams.map(t => t.ministryName);
    console.log('   Available ministry names:', ministryNames);
    
    console.log('\n💡 TIP: Departemen di pengurusList harus PERSIS SAMA dengan ministryName di teams');
    console.log('   dan harus match dengan ministryName di props component');
}

// 5. Recommendations
console.log('\n📋 NEXT STEPS:');
if (!pengurusList || !ministryTeams) {
    console.log('1. ⚠️  Add data using populate-test-data.html or run code above');
    console.log('2. 🔄 Refresh page after adding data');
} else {
    console.log('1. ✅ Data exists in localStorage');
    console.log('2. 🔍 Check if departemen/ministryName matches exactly');
    console.log('3. 🔄 Try refreshing the page (Ctrl+F5 for hard refresh)');
    console.log('4. 🧹 If still not working, clear localStorage and re-add data');
}

console.log('\n✅ Debug complete!');
