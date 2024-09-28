// Hàm gửi tin nhắn và lưu vào Local Storage
function sendMessage() {
    const message = document.getElementById('messageInput').value;

    // Kiểm tra nếu tin nhắn trống
    if (message.trim() === "") {
        alert("Tin nhắn không được để trống!");
        return;
    }

    // Lấy danh sách tin nhắn hiện tại từ Local Storage
    let messages = JSON.parse(localStorage.getItem('anonymousMessages')) || [];
    
    // Tạo đối tượng tin nhắn với thời gian hiện tại và trạng thái chưa đọc
    const newMessage = {
        content: message,
        timestamp: new Date().getTime(),
        read: false // Trạng thái tin nhắn chưa đọc
    };

    // Thêm tin nhắn mới vào danh sách
    messages.push(newMessage);
    
    // Lưu lại vào Local Storage
    localStorage.setItem('anonymousMessages', JSON.stringify(messages));

    // Hiển thị thông báo và xóa nội dung tin nhắn
    document.getElementById('status').innerText = "Tin nhắn đã được gửi!";
    document.getElementById('messageInput').value = ''; // Reset tin nhắn sau khi gửi
}

// Hàm tải tin nhắn cho trang admin
function loadMessages() {
    let messages = JSON.parse(localStorage.getItem('anonymousMessages')) || [];
    const messagesList = document.getElementById('messagesList');
    messagesList.innerHTML = ''; // Xóa nội dung cũ

    // Hiển thị từng tin nhắn trong danh sách
    messages.forEach((message, index) => {
        const messageDiv = document.createElement('div');
        messageDiv.className = 'message-item';
        messageDiv.innerHTML = `
            <strong>Tin nhắn ${index + 1}:</strong> ${message.content}
            <button class="icon-button" onclick="markAsRead(${index})">
                <img src="https://upload.wikimedia.org/wikipedia/commons/thumb/a/ae/BlueFlat_tick_icon2.svg/2048px-BlueFlat_tick_icon2.svg.png" alt="Đánh dấu đã đọc">
            </button>
            <button class="icon-button" onclick="deleteMessage(${index})">
                <img src="https://cdn.pixabay.com/photo/2013/07/12/17/10/trashcan-151725_1280.png" alt="Xóa tin nhắn">
            </button>
        `;

        // Nếu tin nhắn đã đọc, thay đổi màu nền
        if (message.read) {
            messageDiv.classList.add('message-read');
        }

        messagesList.appendChild(messageDiv);
    });
}

// Hàm đánh dấu tin nhắn đã đọc và đặt thời gian xóa sau 15 phút
function markAsRead(index) {
    let messages = JSON.parse(localStorage.getItem('anonymousMessages')) || [];

    if (messages[index]) {
        messages[index].read = true; // Đánh dấu tin nhắn đã đọc

        // Cập nhật Local Storage
        localStorage.setItem('anonymousMessages', JSON.stringify(messages));
        
        // Cập nhật giao diện
        loadMessages();

        // Tạo thời gian xóa tin nhắn sau 15 phút (15 * 60 * 1000 = 900000ms)
        setTimeout(() => {
            deleteMessage(index);
        }, 900000);
    }
}

// Hàm xóa tin nhắn khỏi Local Storage
function deleteMessage(index) {
    let messages = JSON.parse(localStorage.getItem('anonymousMessages')) || [];

    // Xóa tin nhắn khỏi mảng
    if (messages[index]) {
        messages.splice(index, 1); // Xóa tin nhắn tại vị trí index
    }

    // Lưu lại vào Local Storage sau khi xóa
    localStorage.setItem('anonymousMessages', JSON.stringify(messages));
    
    // Cập nhật lại giao diện
    loadMessages();
}
