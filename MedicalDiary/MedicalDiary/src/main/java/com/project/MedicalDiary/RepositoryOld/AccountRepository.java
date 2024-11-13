//package com.project.MedicalDiary.RepositoryOld;
//
//
//import com.project.MedicalDiary.Mapper.AccountMapper;
//import com.project.MedicalDiary.Model.Account;
//import org.springframework.beans.factory.annotation.Autowired;
//import org.springframework.dao.EmptyResultDataAccessException;
//import org.springframework.jdbc.core.support.JdbcDaoSupport;
//import org.springframework.stereotype.Repository;
//import org.springframework.transaction.annotation.Transactional;
//
//import javax.sql.DataSource;
//import java.util.List;
//
//@Repository
//@Transactional
//public class AccountRepository extends JdbcDaoSupport {
//
//    @Autowired
//    public AccountRepository(DataSource dataSource) {
//        this.setDataSource(dataSource);
//    }
//
//    public List<Account> getListAccount() {
//        String sql = AccountMapper.BASE_SQL;
//
//        Object[] params = new Object[]{};
//        AccountMapper accountMapper = new AccountMapper();
//        List<Account> list = this.getJdbcTemplate().query(sql, params, accountMapper);
//
//        return list;
//    }
//
//    public Account getAccountByUserName(String email) {
//        String sql = AccountMapper.BASE_SQL + " where Email = ?";  // Sử dụng ? làm placeholder
//
//        Object[] params = new Object[]{ email };  // Truyền tham số userName vào mảng params
//        AccountMapper accountMapper = new AccountMapper();
//        try{
//            Account account = this.getJdbcTemplate().queryForObject(sql, params, accountMapper);
//            return account;
//        }catch (EmptyResultDataAccessException e){
//            return null;
//        }
//    }
//
//    public void insertAccount(Account account) {
//        String sql = "INSERT INTO Account (ID_Family,PassWord,Email) VALUES (?, ?, ?)";
//
//        Object[] params = new Object[]{
//                account.getID_Family(),
//                account.getPassword(),
//                account.getEmail(),
//        };
//
//        this.getJdbcTemplate().update(sql, params);
//    }
//
//    public void updateAccount(Account account) {
//        String sql = "UPDATE Account SET ID_Family = ?, PassWord = ? WHERE Email = ?";
//
//        Object[] params = new Object[]{
//                account.getID_Family(),
//                account.getPassword(),
//                account.getEmail()
//        };
//
//        this.getJdbcTemplate().update(sql, params);
//    }
//
//
//
//
//}
